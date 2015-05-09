var keyshotVR;

function initKeyShotVR() {
var nameOfDiv = "KeyShotVR";
var folderName = "keyshot";
var imageWidth = 1210;
var imageHeight = 1080;
var backgroundColor = "#FFFFFF";
var uCount = 36;
var vCount = 36;
var uWrap = false;
var vWrap = false;
var uMouseSensitivity = -0.189474;
var vMouseSensitivity = 0.211765;
var uStartIndex = 18;
var vStartIndex = 18;
var minZoom = 1.000000;
var maxZoom = 1.000000;
var rotationDamping = 0.800000;
var downScaleToBrowser = false;
var addDownScaleGUIButton = false;
var addPlayGUIButton = false;
var imageExtension = "jpg";
var showLoading = false;
var loadingIcon = "ks_logo.png"; // Set to empty string for default icon.
var allowFullscreen = false; // Double-click in desktop browsers for fullscreen.

keyshotVR = new keyshotVR(nameOfDiv,folderName,imageWidth,imageHeight,backgroundColor,uCount,vCount,uWrap,vWrap,uMouseSensitivity,vMouseSensitivity,uStartIndex,vStartIndex,minZoom,maxZoom,rotationDamping,downScaleToBrowser,addDownScaleGUIButton,addPlayGUIButton,imageExtension,showLoading,loadingIcon,allowFullscreen);
}

window.onload = initKeyShotVR;