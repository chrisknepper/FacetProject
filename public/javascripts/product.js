var threeContainer;

var camera, scene, renderer, frame;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

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

	threeInit();
	animate();


}

function threeInit() {

	threeContainer = document.getElementById( 'ThreeJS' );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 100;

	// scene

	scene = new THREE.Scene();

	var ambient = new THREE.AmbientLight( 0x101030 );
	scene.add( ambient );

	var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, 0, 1 );
	scene.add( directionalLight );

	// skybox
	var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

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


	var loader = new THREE.ImageLoader( manager );
	loader.load( '/models/textures/UV_Grid_Sm.jpg', function ( image ) {

		texture.image = image;
		texture.needsUpdate = true;

	} );

	// model

	var loader = new THREE.OBJLoader( manager );
	loader.load( '/models/male02.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.map = texture;

			}

		} );

		//object.position.y = - 80;
		scene.add( object );

	}, onProgress, onError );

	//

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias:true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	threeContainer.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX ) / 2;
	mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {
	frame = requestAnimationFrame( animate );
	render();
}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.lookAt( scene.position );

	renderer.render( scene, camera );


}
