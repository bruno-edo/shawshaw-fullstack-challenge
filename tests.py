#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import unittest

import webtest

import main

class TestMainHandler(unittest.TestCase):
    def setUp(self):
        # Wrap the app with WebTest’s TestApp.
        self.testapp = webtest.TestApp(main.app)
    
    # Test the handler.
    def testMaindHandler(self):
        response = self.testapp.get('/')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(response.content_type, 'text/html')


class TestAPIHandlers(unittest.TestCase):
    def setUp(self):
        # Wrap the app with WebTest’s TestApp.
        self.testapp = webtest.TestApp(main.app)
        self.testapp.get('/')

    def testDogBreedsHandler(self):
        response = self.testapp.get('/dogs/breeds')
        self.assertEqual(response.status_int, 200)
        self.assertEqual(type(json.loads(response.body)), list)

    def testDogImagesHandler(self):
        response = self.testapp.get('/dogs/breeds/images', {
            'breedNames': json.dumps(['boxer', 'akita']),
            'imageCount': 2
        })
        self.assertEqual(response.status_int, 200)
        response_body = json.dumps(json.loads(response.body.decode()))
        response_body = json.loads(response_body)
        self.assertEqual(type(response_body), list)
         
        for breed in response_body:
            self.assertEqual(type(breed), dict)
            self.assertEqual(type(breed['name'].encode('utf8')), str)
            self.assertEqual(type(breed['images']), list)
            self.assertEqual(len(breed['images']), 2)


class TestFavorites(unittest.TestCase):
    def setUp(self):
        # Wrap the app with WebTest’s TestApp.
        self.testapp = webtest.TestApp(main.app)
        self.testapp.get('/')

    def testFavoritesHandler(self):
        response = self.testapp.post('/dogs/favorites', json.dumps({
            'breedName': 'boxer'
        }))
        self.assertEqual(response.status_int, 200)

        response = self.testapp.get('/dogs/favorites')
        self.assertEqual(response.status_int, 200)

        response_body = json.loads(response.body)
        self.assertEqual(type(response_body), list)
        self.assertTrue('boxer' in response_body)

if __name__ == '__main__':
    unittest.main()