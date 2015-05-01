      var container , camera , scener, renderer , stats;

      var controller , controls;

      init();
      animate();

      function init(){

        controller = new Leap.Controller();
     
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          50 ,
          window.innerWidth / window.innerHeight,
          1 ,
          1000
        );

        camera.position.z = 100;
        console.log( camera );

        var ambient = new THREE.AmbientLight( '#aaaaaa' );
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 40, -100, 0 );
        scene.add( directionalLight );

        controls = new THREE.LeapTrackballControls( camera , controller );

        controls.rotationSpeed            = 10;
        controls.rotationDampening        = .98;
        controls.zoom                     = 40;
        controls.zoomDampening            = .6;
        controls.zoomCutoff               = .9;
        controls.zoomEnabled              = true;

        controls.minZoom                  = 20;
        controls.maxZoom                  = 80;

          var loader = new THREE.OBJMTLLoader();
  loader.load( '/models/watchandtexturetrial.obj', '/models/watchandtexturetrial.mtl', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        child.geometry.computeBoundingBox();
        //console.log(child.geometry.boundingBox);

      }

    } );
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    object.scale.set(0.2, 0.2, 0.2);
    scene.add( object );

  });

        container = document.getElementById( 'threedemoContainer' );
        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );      

        controller.connect();


      }


      function animate(){

        controls.update();
        renderer.render( scene , camera );

        requestAnimationFrame( animate );

      }