from django.test import TestCase
from restlib2.http import codes
from django.http import HttpResponse
from varify.assessments.resources import *
from ..base import *

class AssessmentResourceTestCase(AuthenticatedBaseTestCase):
	
	#test the get method of class AssessmentsResources
	def test_get_all(self):
		response = self.client.get('/api/assessments/',HTTP_ACCEPT = 'application/json')
		self.assertEqual(response.status_code, codes.no_content)
		
		
