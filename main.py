#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import json
import urllib2

import jinja2
import webapp2

from webapp2_extras import sessions

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

API_BREEDS_DOGS = 'https://hidden-crag-71735.herokuapp.com'

config = {}
config['webapp2_extras.sessions'] = {
    'secret_key': 'some-secret-key',
}

class BaseHandler(webapp2.RequestHandler):
    def dispatch(self):
        # Get a session store for this request.
        self.session_store = sessions.get_store(request=self.request)

        try:
            # Dispatch the request.
            webapp2.RequestHandler.dispatch(self)
        finally:
            # Save all sessions.
            self.session_store.save_sessions(self.response)

    @webapp2.cached_property
    def session(self):
        # Returns a session using the default cookie key.
        return self.session_store.get_session()

class MainPage(BaseHandler):
    def get(self):
        if self.session.get('favorites'):
            pass
        else:
            self.session['favorites'] = []

        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class DogBreeds(BaseHandler):
    def is_favorite(self, breed):
        list_favorites = self.session.get('favorites')

        if breed in list_favorites:
            return True
        else:
            return False

    def get_breed_dict_list(self, list_breeds):
        return_list = []

        for breed in list_breeds:
            
            dict_breed = {
                'name': breed,
                'favorite': self.is_favorite(breed)
            }
            return_list.append(dict_breed)

        return return_list


    def get(self):
        url = API_BREEDS_DOGS + '/api/breeds'
        response = urllib2.urlopen(url)
        data = json.load(response)

        list_dict_breeds = self.get_breed_dict_list(data)

        self.response.write(json.dumps(list_dict_breeds))

class DogImages(BaseHandler):
    def get(self):
        breed_name = self.request.get('breedName')
        url = API_BREEDS_DOGS + '/api/{0}/images'
        url = url.format(breed_name)
        response = urllib2.urlopen(url)
        data = json.load(response)
        self.response.write(json.dumps(data))

class DogFavorites(BaseHandler):
    def get(self):
        list_breeds = sorted(self.session.get('favorites'))
        self.response.write(json.dumps(list_breeds))

    def post(self):
        request_body = json.loads(self.request.body)
        breed = request_body['breedName']

        list_breeds = self.session.get('favorites')
        list_breeds.append(breed)
        self.session['favorites'] = list_breeds
    
    def delete(self):
        breed_name = self.request.get('breedName')
        list_breeds = self.session.get('favorites')
        list_breeds.remove(breed_name)
        self.session['favorites'] = list_breeds

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/dogs/breeds', DogBreeds),
    ('/dogs/breeds/images', DogImages),
    ('/dogs/favorites', DogFavorites)
], debug=True, config=config)