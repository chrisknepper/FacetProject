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

        camera.position.z = -30;
        console.log( camera );

        var ambient = new THREE.AmbientLight( '#ffffff' );
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( camera.position.x, camera.position.y - 100, camera.position.z + 200);
        scene.add( directionalLight );

        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 0, -100, -10);
        scene.add( directionalLight );

        controls = new THREE.LeapTrackballControls( camera , controller );

        controls.rotationSpeed            = 10;
        controls.rotationDampening        = .45;
        controls.zoom                     = 40;
        controls.zoomDampening            = .6;
        controls.zoomCutoff               = .9;
        controls.zoomEnabled              = true;

        controls.minZoom                  = 20;
        controls.maxZoom                  = 75;

          var loader = new THREE.OBJMTLLoader();
  loader.load( '/models/finalwatchmodelthree.obj', '/models/finalwatchmodel.mtl', function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {

        child.geometry.computeBoundingBox();
        //console.log(child.geometry.boundingBox);

      }

    } );
    object.position.x = 0;
    object.position.y = 0;
    object.position.z = 0;
    object.scale.set(4,4,4);
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