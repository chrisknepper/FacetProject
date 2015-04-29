var threeContainer;

var camera, scene, renderer, frame, controls;

function init() {
	function switchMenu(active){
		$(active).css('zIndex', '70');    
	}
    
	var container = document.querySelector('#container');

	$('#movementm').click(function(){switchMenu('#movement');});
	$('#featuresm').click(function(){switchMenu('#features');});
	$('#variationsm').click(function(){switchMenu('#variations');});
	$('#inspirationm').click(function(){switchMenu('#inspiration');});  
	$('#externalm').click(function(){switchMenu('#external');});
	$('#buym').click(function(){switchMenu('#buy');});
	$('.back').click(function(){
		//var category=this.parent();
		 $(this).parent().css('zIndex', '-1');
		 
		 
	});
    var watchid='#'+3;
    $('#3').addClass('selected');
	threeInit();
	animate();


}

function threeInit() {

	threeContainer = document.getElementById( 'ThreeJS' );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// scene

	scene = new THREE.Scene();

	scene.add(camera);	

	var ambient = new THREE.AmbientLight( '#aaaaaa' );
	camera.position.set(0,0,-800);
	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.05;
	controls.addEventListener( 'change', render );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 40, -100, 0 );
	scene.add( directionalLight );

	// texture

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	var texture = new THREE.Texture();

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	// model
	var loader = new THREE.OBJMTLLoader( manager );
	loader.load( '/models/orient.obj', '/models/orient.mtl', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.geometry.computeBoundingBox();
				//console.log(child.geometry.boundingBox);

			}

		} );
		object.position.x = 200;
		object.position.y = 0;
		object.position.z = 0;
		object.scale.set(0.2, 0.2, 0.2);
		scene.add( object );

	}, onProgress, onError );

	//

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias:true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	threeContainer.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
	frame = requestAnimationFrame( animate );
	render();
}

function render() {

	renderer.render( scene, camera );


}
