axios = require 'axios'

SearchPageTemplate = require "../templates/pages/search-page"
ProjectPresenter = require "./project"

# SignInPopTemplate = require "../templates/includes/sign-in-pop"

module.exports = (application, query) ->

  self = 

    application: application

    template: ->
      self.results = self.getSearchResults query
      SearchPageTemplate self
    
    getSearchResults: (query) ->
      console.log 'getSearchResults for:', query
      axios.get query
      .then (response) ->
        application.overlayReadmeError false
        application.overlayReadme self.mdToNode(response.data)
        application.overlayReadmeLoaded true
      .catch (error) ->
        if axios.isCancel error
          console.log 'request cancelled', project.domain
        else
          console.error "getProjectReadme", error
          self.showReadmeError()

      
      