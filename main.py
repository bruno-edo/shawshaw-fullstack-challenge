#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import urllib2

import jinja2
import webapp2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

API_BREEDS_DOGS = 'https://hidden-crag-71735.herokuapp.com'

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class DogBreeds(webapp2.RequestHandler):
    def get(self):
        url = API_BREEDS_DOGS + '/api/breeds'
        response = urllib2.urlopen(url)
        data = json.load(response)
        self.response.write(json.dumps(data))

    def post(self):
        pass


app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/dogs/breeds', DogBreeds)
], debug=True)