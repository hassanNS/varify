#Tested resources.py in assessments
#1) get requests
#2) post requests (along with verify counts)
#3) put requests (along with verify counts)


from django.test import TestCase
import json
from restlib2.http import codes
from django.http import HttpResponse
from varify.assessments.resources import *
from ..base import *
import os
from django.test.utils import override_settings
from varify.assessments.models import Assessment, Pathogenicity, \
    ParentalResult, AssessmentCategory
from varify.samples.models import Sample, Result
from django.contrib.auth.models import User
from django.core import management
from django_rq import get_worker
from django.core.cache import cache
from django_rq import get_worker, get_queue, get_connection
from rq.queue import get_failed_queue

TESTS_DIR = os.path.join(os.path.dirname(__file__), '../..')
SAMPLE_DIRS = [os.path.join(TESTS_DIR, 'samples', 'batch1')]

@override_settings(VARIFY_SAMPLE_DIRS=SAMPLE_DIRS)
class AssessmentResourceTestCase(AuthenticatedBaseTestCase):

	def setUp(self):
		cache.clear()
		get_queue('variants').empty()
		get_queue('default').empty()
		get_failed_queue(get_connection()).empty()
		
		 # Immediately validates and creates a sample
		management.call_command('samples', 'queue')

		# Synchronously work on queue
		worker1 = get_worker('variants')
		worker2 = get_worker('default')

		# Work on variants...
		worker1.work(burst=True)

		# Work on effects...
		worker2.work(burst=True)

		# Create and record some data that will be used to create knowledge
		# capture assessments later on.
		self.pathogenicity = Pathogenicity(name='pathogenic')
		self.pathogenicity.save()
		self.parental_result = ParentalResult(name='heterozygous')
		self.parental_result.save()
		self.category = AssessmentCategory(name='other')
		self.category.save()
		super(AssessmentResourceTestCase,self).setUp()
		
	#test the get method of class AssessmentsResources
	def test_get_all(self):
		response = self.client.get('/api/assessments/',HTTP_ACCEPT = 'application/json')
		self.assertEqual(response.status_code, codes.no_content)
	
	#try using a primary key of 999. Should return 404	
	def test_get_when_empty(self):
		response = self.client.get('/api/assessments/1/',HTTP_ACCEPT= 'application/json')
		self.assertEqual(response.status_code, codes.not_found)
		
		sample_id = Sample.objects.get(batch__name='batch1', name='NA12891').id

		# Associate some knowledge capture with a sample result for the sample
		# we are trying to delete.
		sample_result = Result.objects.filter(sample_id=sample_id)[0]
		assessment = Assessment(sample_result=sample_result, user=self.user,
					assessment_category=self.category,
					sanger_requested=True,
					pathogenicity=self.pathogenicity,
					father_result=self.parental_result,
					mother_result=self.parental_result)
		assessment.save()
		
		response = self.client.get('/api/assessments/1/',HTTP_ACCEPT= 'applicati    on/json')
		self.assertEqual(response.status_code, codes.ok)
		self.assertTrue(response.content)

	
	def test_post_all(self):
		
		sample_id = Sample.objects.get(batch__name='batch1', name='NA12891').id

		# Associate some knowledge capture with a sample result for the sample
		# we are trying to delete.
		sample_result = Result.objects.filter(sample_id=sample_id)[0]
		count_before = 	Assessment.objects.count()
		#create a json to pass in
		a_obj = {"sample_result":sample_result.id,
				"user":self.user.id, 
				"assessment_category":self.category.id,
				"pathogenicity":self.pathogenicity.id,
				"father_result":self.parental_result.id,
				"mother_result":self.parental_result.id,
				"sanger_requested": True,
				}	
		#TESTING REGULAR POST
		response = self.client.post('/api/assessments/',
				data=json.dumps(a_obj),
				content_type='application/json',
				HTTP_ACCEPT='application/json'
				)
		count_after = Assessment.objects.count()

		print(response.content)
		self.assertEqual(response.status_code, codes.created) #tested if post was ok
		self.assertEqual(count_after, count_before+1)

		#TESING POST WITH BAD VALUE
		response = self.client.post('/api/assessments/',
				data = json.dumps({}), #empty json 
				content_type = 'application/json',
				HTTP_ACCEPT = 'application/json')
		#should be unprocessable!
		self.assertEqual(response.status_code, codes.UNPROCESSABLE_ENTITY)
	
	#do a put test by first creating an assessment then trying to retrive it
	def test_put(self):

		#first create an assessment object
		sample_id = Sample.objects.get(batch__name='batch1', name='NA12891').id
											
		sample_result = Result.objects.filter(sample_id=sample_id)[0]
		a = Assessment(sample_result=sample_result, user=self.user,
					assessment_category=self.category,
					sanger_requested=False,
					pathogenicity=self.pathogenicity,
					father_result=self.parental_result,
					mother_result=self.parental_result)
		a.save()
		a_id = str(a.id) #get the id for the put request
		count_before = Assessment.objects.count()

		#create a new category to change our assessment
		new_category = AssessmentCategory(name='dangerous')
		new_category.save()

		
		#make the json object with the same values (except for the category) 
		a_obj = {"sample_result":a.id,
				"user":a.user.id, 
				"assessment_category":new_category.id, #change the category, keep everything else the same
				"pathogenicity":a.pathogenicity.id,
				"father_result":a.father_result.id,
				"mother_result":a.mother_result.id,
				"sanger_requested":False,
			}



		print '/api/assessments/'+a_id+'/'
		#try to change the assessment object's sanger_requested field
		
		response = self.client.put('/api/assessments/'+a_id+'/',
						data=json.dumps(a_obj),
						content_type = 'application/json',
						HTTP_ACCEPT = 'application/json')
		print response.content
		count_after = Assessment.objects.count()

		self.assertEqual(response.status_code, codes.ok) #should be ok
		#put request with the category should have changed our object!
		self.assertEqual(int(a_id),a.id) 
		self.assertEquals(count_before,count_after) #the count should not have changed!
	


