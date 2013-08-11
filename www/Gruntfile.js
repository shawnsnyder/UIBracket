
module.exports = function(grunt) {
  
    grunt.initConfig({
        pkg: '<json:package.json>',
        bgShell: {
            _defaults: {
                bg: true,
                stdout: true,
                stderr: true
            },
            compass: {
                cmd: 'compass clean client && compass watch -c client/config.rb client'
            },
            coffee: {
                cmd: 'coffee --compile --bare --watch client/scripts',
            },            
            nodeserver: {
                cmd: 'node app.js',
                bg: false
            }
        }
        
    });
  
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.registerTask('default', ['bgShell:compass', 'bgShell:coffee', 'bgShell:nodeserver']);
};

//'bgShell:watchCoffeeApp', 
//'bgShell:runNode'


//dev flip 