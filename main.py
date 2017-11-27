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
    def get_breed_dict_list(self, list_breeds):
        return_list = []

        for breed in list_breeds:
            dict_breed = {
                'name': breed,
                'favorite': False
            }
            return_list.append(dict_breed)

        return return_list


    def get(self):
        url = API_BREEDS_DOGS + '/api/breeds'
        response = urllib2.urlopen(url)
        data = json.load(response)

        list_dict_breeds = self.get_breed_dict_list(data)

        self.response.write(json.dumps(list_dict_breeds))

    def post(self):
        pass


class DogImages(webapp2.RequestHandler):
    def get(self):
        breed_name = self.request.get('breedName')
        url = API_BREEDS_DOGS + '/api/{0}/images'
        url = url.format(breed_name)
        response = urllib2.urlopen(url)
        data = json.load(response)
        self.response.write(json.dumps(data))

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/dogs/breeds', DogBreeds),
    ('/dogs/breeds/images', DogImages)
], debug=True)