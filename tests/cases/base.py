from django.test import TestCase
from django.contrib.auth.models import User

# Class needed for authenticated test cases
class BaseTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='root',
            password='password')
        self.user.is_superuser = True
        self.user.save()


class AuthenticatedBaseTestCase(BaseTestCase):
    def setUp(self):
        super(AuthenticatedBaseTestCase, self).setUp()

        self.user = User.objects.create_user(username='test', password='test')
        self.client.login(username='test', password='test')
	print "logged in"



