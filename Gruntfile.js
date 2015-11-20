module.exports = function(grunt) {
  grunt.initConfig({

    karma: {
			options: {
				configFile: 'test/karma-conf.js'
			},
			unit: {
				singleRun: true
			},
			continuous: {
				background: true
			}
    },

    protractor: {
	    options: {
	      configFile: "test/protractor-conf.js", // Default config file
	      // keepAlive: true, // If false, the grunt process stops when the test fails.
	      noColor: false, // If true, protractor will not use colors in its output.
	      // debug: true,
	      args: {

	      }
	    },
	    e2e: {
	    	options: {
		    	keepAlive: false
		    }
	    },
	    continuous: {
	    	options: {
		    	keepAlive: true
		    }
	    }
	  },

		watch: {
      options: {
      	livereload: true
      },
      karma: {
        files: ['app/js/**/*.js', 'test/unit/*.js'],
        tasks: ['karma:continuous:run']
      }
      ,
      protractor: {
        files: ['app/js/**/*.js', 'test/e2e/*.js'],
        tasks: ['protractor:continuous']
      }
  	},

  	run: {
	    mock_server: {
	      options: {
	        wait: false
	      },
	      args: []
	      // args: ['app/mockApi/apiserver.js']
	    }
	  },

	  connect: {
    	options: {
        port: 9002,
        hostname: 'localhost'
      },
      livereload: {
        options: {
        	livereload: 35729,
          open: true,
          base: ['app']
          
        }
      },
      test: {
      	options: {
      		base: ['app']
      	}
      }
    },release: {
		  options: {
			  //bump: false, //default: true
			  //changelog: true, //default: false
			  //changelogText: '<%= version %>\n', //default: '### <%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'
			  //file: 'component.json', //default: package.json
			  //add: false, //default: true
			  //commit: false, //default: true
			  //tag: false, //default: true
			  //push: false, //default: true
			  pushTags: true, //default: true
			  npm: false, //default: true
			  //npmtag: true, //default: no tag
			  //indentation: '\t', //default: '  ' (two spaces)
			  //folder: 'folder/to/publish/to/npm', //default project root
			  //tagName: 'some-tag-<%= version %>', //default: '<%= version %>'
			  //commitMessage: 'check out my release <%= version %>', //default: 'release <%= version %>'
			  //tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',
			  //beforeBump: [], // optional grunt tasks to run before file versions are bumped
			  //afterBump: [], // optional grunt tasks to run after file versions are bumped
			  //beforeRelease: [], // optional grunt tasks to run after release version is bumped up but before release is packaged
			  //afterRelease: [], // optional grunt tasks to run after release is packaged
			  //updateVars: [], // optional grunt config objects to update (this will update/set the version property on the object specified)
			  //github: {
			  //  apiRoot: 'https://git.example.com/v3', // Default: https://github.com
			  //  repo: 'geddski/grunt-release', //put your user/repo here
			  //  accessTokenVar: 'GITHUB_ACCESS_TOKE', //ENVIRONMENT VARIABLE that contains GitHub Access Token
			  //
			  //  // Or you can use username and password env variables, we discourage you to do so
			  //  usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains GitHub username
			  //  passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains GitHub password
			  //}
		  }
	  }
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-run');
	grunt.loadNpmTasks('grunt-release');


	grunt.registerTask('serve', ['karma:continuous:start', 'run:mock_server', 'connect:livereload', 'watch:karma']);

	grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);
	
	grunt.registerTask('e2e-test', ['connect:test',  'protractor:continuous', 'watch:protractor']);

	grunt.registerTask('test', ['karma:unit:start', 'connect:test', 'run:mock_server', 'protractor:e2e']);

};
