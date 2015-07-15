/********************
// Constant variable
*********************/
var COMMAND = {
	FORWARD: {
		action: 0,
		text: "⇧ FORWARD"
	},
	BACK: {
		action: 1,
		text: "⇩ BACK"
	},
	TURN_LEFT: {
		action: 2,
		text: "⇦ LEFT"
	},
	TURN_RIGHT: {
		action: 3,
		text: "⇨ RIGHT"
	},
	LENGTH: 4
};
var EYE_PARAM = {
	COVER: Math.PI /2,
	NUM_EYES: 24,
	DISTANCE: 300,
	SAFE_COLOR: 0xffff00,
};
var OBJECT_TYPE = {
	NONE: {
		text: "NONE",
	},
	OBSTACLE: {
		text: "BARRIER",
	},
	WALL: {
		text: "WALL",
	},
	ITEM: {
		text: "ITEM",
	},
	CAR: {
		text: "CAR",
	},
	FLOOR: {
		text: "FLOOR",
	},
	EYE_GROUP: {
		text: "EYES",
	},
};
var CAR_INFO = {
	CAR_TEXTURE: "./assets/textures/home.png",
	SIZE: 50,
	SPEED: 200,
	ROTATE_AMOUNT: 2
};

// cursor mode
var CURSOR_MODE = {
	SELECT: {
		TEXTURE: "./assets/textures/select.png",
		text: "SELECT",
	},
	DELETE: {
		TEXTURE: "./assets/textures/delete.png",
		text: "DELETE",
	},
	ADD_CAR: {
		TEXTURE: "./assets/textures/addCar.png",
		text: "+CAR",
	},
	ADD_OBSTACLE: {
		TEXTURE: "./assets/textures/barrier.png",
		text: "+CUBE",
	},
	ADD_ITEM: {
		TEXTURE: "./assets/textures/item.png",
		text: "+ITEM",
	}
}

// deep learning mode
var MODE = {
	NONE: {
		switchStyle: "brightness(100%) grayscale(90%)",
		text: "NONE",
		class: "",
	},
	MANUAL: {
		switchStyle: "brightness(100%) hue-rotate(0deg)",
		text: "MANUAL",
		class: "inactive",
	},
	LEARNING: {
		switchStyle: "brightness(150%) hue-rotate(250deg)",
		text: "LEARNING",
		class: "safe",
	},
	FREEDOM: {
		switchStyle: "brightness(150%) hue-rotate(190deg)",
		text: "FREERUN",
		class: "active",
	}
}
var COURSE = {
	NONE: 0,
	RANDOM: {
		NUM_OBSTACLES: 50,
		OBSTACLE_SIZE: 50,
		FLOOR_TEXTURE: "./assets/textures/circle.jpg",
		SKY_TEXTURE: "assets/textures/stars.jpg",
		OBSTACLE_TEXTURE: "./assets/textures/crystal.jpg",
		ITEM_TEXTURE:"./assets/textures/zero.png",
		ITEM_SIZE: 50,
		NUM_ITEMS: 2,
		WALL_SIZE: 100,
		WALL_TEXTURE: "./assets/textures/metal.jpg",	
	},
}
var WORLD_INFO = {
	WORLD_SIZE: 1600,
	COURSE: COURSE.RANDOM
}


/**********************
// Global variable
***********************/
var clock = new THREE.Clock();
var scene;
var renderer;
var camera;
var robotCamera;
var controls;
var light;
var delta = 0;
var debug;



var env;
var prebuiltWorldJSON = [
	'{"walls":[{"position":{"x":-800,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-700,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-700,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-600,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-600,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-500,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-500,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-400,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-400,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-300,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-300,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-200,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-200,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-100,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-100,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":0,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":0,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":100,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":100,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":200,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":200,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":300,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":300,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":400,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":400,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":500,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":500,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":600,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":600,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":700,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":700,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":800},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-700},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-700},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-600},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-600},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-500},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-500},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-400},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-400},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-300},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-300},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-200},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-200},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":-100},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":-100},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":0},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":0},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":100},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":100},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":200},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":200},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":300},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":300},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":400},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":400},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":500},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":500},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":600},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":600},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-800,"y":50,"z":700},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":800,"y":50,"z":700},"rotation":{"x":0,"y":0,"z":0}}],"obstacles":[{"position":{"x":512.5622484833002,"y":25,"z":-799.9496292322874},"rotation":{"x":0,"y":4.875303222782522,"z":0}},{"position":{"x":-779.9272540956736,"y":25,"z":-212.85835653543472},"rotation":{"x":0,"y":1.679769512914078,"z":0}},{"position":{"x":-459.5924480907718,"y":25,"z":71.17974739472163},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-457.2733940355511,"y":25,"z":17.761193275727237},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-455.0628148807272,"y":25,"z":-33.15868155918065},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-451.81502833422104,"y":25,"z":-92.72330497900771},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-450.6861932950957,"y":25,"z":-144.59401439306487},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-446.5331437931843,"y":25,"z":-195.83366320060452},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-435.98973558337474,"y":25,"z":-247.70299787573512},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":-466.07458440346244,"y":25,"z":122.18743904030369},"rotation":{"x":0,"y":0,"z":0}},{"position":{"x":485.35907633662265,"y":25,"z":-718.4803965393693},"rotation":{"x":3.141592653589793,"y":-1.431740630652098,"z":3.141592653589793}},{"position":{"x":538.2526200786251,"y":25,"z":-706.9397899281878},"rotation":{"x":3.141592653589793,"y":-1.3057457302864173,"z":3.141592653589793}},{"position":{"x":590.0086506671158,"y":25,"z":-685.7812201999202},"rotation":{"x":3.141592653589793,"y":-1.0847926756001154,"z":3.141592653589793}},{"position":{"x":636.7940940293975,"y":25,"z":-652.1672821220183},"rotation":{"x":3.141592653589793,"y":-0.8313776725471974,"z":3.141592653589793}},{"position":{"x":677.4861175907928,"y":25,"z":-609.6895133061704},"rotation":{"x":3.141592653589793,"y":-0.5442116224505673,"z":3.141592653589793}},{"position":{"x":700.3739365423156,"y":25,"z":-559.2459582693295},"rotation":{"x":3.141592653589793,"y":-0.344795638570519,"z":3.141592653589793}},{"position":{"x":715.2014398267809,"y":25,"z":-504.751730604196},"rotation":{"x":3.141592653589793,"y":-0.11099065713217983,"z":3.141592653589793}},{"position":{"x":721.5048015588275,"y":25,"z":-453.04920890024636},"rotation":{"x":3.141592653589793,"y":-0.06127365421386004,"z":3.141592653589793}},{"position":{"x":782.2770962185774,"y":25,"z":-199.95082595551742},"rotation":{"x":3.141592653589793,"y":-0.06127365421386004,"z":3.141592653589793}},{"position":{"x":721.7495525371374,"y":25,"z":-400.6150009866864},"rotation":{"x":-3.141592653589793,"y":0.007504346434579285,"z":-3.141592653589793}},{"position":{"x":722.9931850883912,"y":25,"z":-349.7870386424203},"rotation":{"x":-3.141592653589793,"y":0.007504346434579285,"z":-3.141592653589793}},{"position":{"x":716.2808822864954,"y":25,"z":-293.2888444125279},"rotation":{"x":-3.141592653589793,"y":0.2073123488874386,"z":-3.141592653589793}},{"position":{"x":694.9685065332965,"y":25,"z":-239.41841414396623},"rotation":{"x":-3.141592653589793,"y":0.5395603358059646,"z":-3.141592653589793}},{"position":{"x":660.7667551761842,"y":25,"z":-192.69990867545877},"rotation":{"x":-3.141592653589793,"y":0.789585363389061,"z":-3.141592653589793}},{"position":{"x":616.4230025422893,"y":25,"z":-157.65303601507267},"rotation":{"x":-3.141592653589793,"y":1.0516683852479738,"z":-3.141592653589793}},{"position":{"x":570.6634315992626,"y":25,"z":-135.2411087163252},"rotation":{"x":-3.141592653589793,"y":1.0805363842011657,"z":-3.141592653589793}},{"position":{"x":526.9192089056464,"y":25,"z":-106.5783252245086},"rotation":{"x":-3.141592653589793,"y":1.0805363842011657,"z":-3.141592653589793}},{"position":{"x":483.6705640821132,"y":25,"z":-78.0569113892447},"rotation":{"x":-3.141592653589793,"y":1.0805363842011657,"z":-3.141592653589793}},{"position":{"x":432.02954309951804,"y":25,"z":-721.2121805320819},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":381.428467855643,"y":25,"z":-723.7949982490469},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":331.2146257009316,"y":25,"z":-723.6834202934358},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":280.7728882668499,"y":25,"z":-724.2750699854654},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":230.3494016665661,"y":25,"z":-721.4545066652993},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":178.61118579801584,"y":25,"z":-721.77935505044},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":127.43363383657211,"y":25,"z":-721.0643577993276},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":75.57568300414218,"y":25,"z":-719.6862253931926},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":23.719471404106514,"y":25,"z":-719.7485433898992},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":-26.696282155854085,"y":25,"z":-719.809130321713},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":-77.11202810668624,"y":25,"z":-719.869717244199},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":44.72829727810267,"y":25,"z":-469.44418322927544},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":-5.654926813506592,"y":25,"z":-471.62825336198375},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":95.03857979066429,"y":25,"z":-470.75322782212277},"rotation":{"x":3.141592653589793,"y":-0.004052653826316006,"z":3.141592653589793}},{"position":{"x":149.7562715558903,"y":25,"z":-467.788991081454},"rotation":{"x":-3.141592653589793,"y":0.09598734431956463,"z":-3.141592653589793}},{"position":{"x":201.75689134170324,"y":25,"z":-467.2987091650405},"rotation":{"x":-3.141592653589793,"y":0.015454346811707934,"z":-3.141592653589793}},{"position":{"x":252.45354271383354,"y":25,"z":-465.6699156059227},"rotation":{"x":0,"y":1.5598616064604571,"z":0}},{"position":{"x":303.2092284827588,"y":25,"z":-465.00567105138646},"rotation":{"x":0,"y":1.5598616064604571,"z":0}},{"position":{"x":353.3034014704671,"y":25,"z":-466.876974071278},"rotation":{"x":0,"y":1.5598616064604571,"z":0}},{"position":{"x":404.7443976434273,"y":25,"z":-446.59715471483526},"rotation":{"x":0,"y":1.4454794821930972,"z":0}},{"position":{"x":398.9550784396822,"y":25,"z":-395.2128749966089},"rotation":{"x":0,"y":1.3772134490228118,"z":0}},{"position":{"x":362.17352353982955,"y":25,"z":-349.11740813982664},"rotation":{"x":0,"y":1.0562782989123003,"z":0}},{"position":{"x":313.48359864728764,"y":25,"z":-315.1902732585264},"rotation":{"x":0,"y":0.531287276502362,"z":0}},{"position":{"x":270.17931949357944,"y":25,"z":-290.04965888528073},"rotation":{"x":0,"y":0.531287276502362,"z":0}},{"position":{"x":226.02621652844454,"y":25,"z":-265.48585999611004},"rotation":{"x":0,"y":0.531287276502362,"z":0}},{"position":{"x":180.6089822183632,"y":25,"z":-231.1046952797933},"rotation":{"x":0,"y":0.7974613016729415,"z":0}},{"position":{"x":144.16905273590186,"y":25,"z":-185.82795940919993},"rotation":{"x":0,"y":1.0808543415072542,"z":0}},{"position":{"x":124.17667453826286,"y":25,"z":-132.18286367465547},"rotation":{"x":0,"y":1.348224237516898,"z":0}},{"position":{"x":117.47655284028042,"y":25,"z":-78.0977095669952},"rotation":{"x":0,"y":1.532068554934673,"z":0}},{"position":{"x":116.56669201710045,"y":25,"z":-27.632385931639618},"rotation":{"x":0,"y":1.5289503909727302,"z":0}},{"position":{"x":119.40691895940307,"y":25,"z":26.575368757463707},"rotation":{"x":-3.141592653589793,"y":1.436520264557898,"z":-3.141592653589793}},{"position":{"x":129.33967576866613,"y":25,"z":77.82457825612285},"rotation":{"x":-3.141592653589793,"y":1.3822634336536301,"z":-3.141592653589793}},{"position":{"x":410.7599907829957,"y":25,"z":1.4632079124011605},"rotation":{"x":-3.141592653589793,"y":1.06631040528304,"z":-3.141592653589793}},{"position":{"x":420.5864223528728,"y":25,"z":55.80960425438312},"rotation":{"x":-3.141592653589793,"y":1.035199388360728,"z":-3.141592653589793}},{"position":{"x":452.52398769494715,"y":25,"z":-28.039006049369405},"rotation":{"x":-3.141592653589793,"y":1.0386662923166547,"z":-3.141592653589793}},{"position":{"x":458.2957995001217,"y":25,"z":99.04559099736377},"rotation":{"x":-3.141592653589793,"y":1.0386662923166547,"z":-3.141592653589793}},{"position":{"x":484.28083525939087,"y":25,"z":143.7373686352615},"rotation":{"x":-3.141592653589793,"y":1.1021903184409145,"z":-3.141592653589793}},{"position":{"x":510.5022360625408,"y":25,"z":190.63394050349427},"rotation":{"x":-3.141592653589793,"y":1.1799013106657088,"z":-3.141592653589793}},{"position":{"x":530.0100243689404,"y":25,"z":240.67010751515573},"rotation":{"x":-3.141592653589793,"y":1.1799013106657088,"z":-3.141592653589793}},{"position":{"x":550.3750380451784,"y":25,"z":287.5218517125214},"rotation":{"x":-3.141592653589793,"y":1.1799013106657088,"z":-3.141592653589793}},{"position":{"x":566.5357554685687,"y":25,"z":341.64575210946896},"rotation":{"x":-3.141592653589793,"y":1.4135934322852295,"z":-3.141592653589793}},{"position":{"x":565.6717249822206,"y":25,"z":396.84681666811304},"rotation":{"x":-3.141592653589793,"y":1.5630990994092424,"z":-3.141592653589793}},{"position":{"x":564.9924596985829,"y":25,"z":457.68369338265177},"rotation":{"x":0,"y":1.3109822435524772,"z":0}},{"position":{"x":539.4350841168505,"y":25,"z":512.4057734766196},"rotation":{"x":0,"y":0.8122573407656418,"z":0}},{"position":{"x":140.40481568348454,"y":25,"z":132.86635046626415},"rotation":{"x":0,"y":0.11418230929776417,"z":0}},{"position":{"x":447.35260439533266,"y":25,"z":571.917764934408},"rotation":{"x":0,"y":0.4346943100143635,"z":0}},{"position":{"x":401.9824045529352,"y":25,"z":597.8553654413839},"rotation":{"x":0,"y":0.4346943100143635,"z":0}},{"position":{"x":349.2729238390315,"y":25,"z":615.9652038024667},"rotation":{"x":0,"y":0.3178782944501664,"z":0}},{"position":{"x":296.8236814532865,"y":25,"z":630.1248848450151},"rotation":{"x":0,"y":0.2516403021335752,"z":0}},{"position":{"x":246.88996367380028,"y":25,"z":646.2433615900164},"rotation":{"x":0,"y":0.1516393145555937,"z":0}},{"position":{"x":193.71381324515528,"y":25,"z":651.6156439977171},"rotation":{"x":0,"y":0.05168930733355611,"z":0}},{"position":{"x":141.71991759149208,"y":25,"z":657.6799929183842},"rotation":{"x":0,"y":0.10979530377009827,"z":0}},{"position":{"x":89.75678761546189,"y":25,"z":663.2379637683422},"rotation":{"x":0,"y":0.07737830752978785,"z":0}},{"position":{"x":38.39234514027925,"y":25,"z":671.4860486986993},"rotation":{"x":0,"y":0.07737830752978785,"z":0}},{"position":{"x":-13.696592445363194,"y":25,"z":676.7399000478273},"rotation":{"x":0,"y":0.07737830752978785,"z":0}},{"position":{"x":-66.89151532114072,"y":25,"z":679.7361788409071},"rotation":{"x":0,"y":0.07737830752978785,"z":0}},{"position":{"x":-117.80411443342818,"y":25,"z":681.123498265823},"rotation":{"x":0,"y":0.06018830904134828,"z":0}},{"position":{"x":-167.8277521805453,"y":25,"z":686.8282825219553},"rotation":{"x":0,"y":0.06018830904134828,"z":0}},{"position":{"x":-218.79646264721757,"y":25,"z":690.9870585805547},"rotation":{"x":0,"y":0.06018830904134828,"z":0}},{"position":{"x":-272.5688217326298,"y":25,"z":691.9254150194425},"rotation":{"x":0,"y":0.06018830904134828,"z":0}},{"position":{"x":-324.5486567530856,"y":25,"z":697.2645151748528},"rotation":{"x":0,"y":0.07682930461620174,"z":0}},{"position":{"x":-378.1298703051609,"y":25,"z":701.7221696635137},"rotation":{"x":0,"y":-0.05239069339951284,"z":0}},{"position":{"x":-432.45839912534876,"y":25,"z":694.1092057160168},"rotation":{"x":0,"y":-0.18308570026778356,"z":0}},{"position":{"x":-484.5317456501315,"y":25,"z":681.1249165460376},"rotation":{"x":0,"y":-0.3204496805481977,"z":0}},{"position":{"x":-535.0016204683088,"y":25,"z":656.2890610939609},"rotation":{"x":0,"y":-0.5491256938684571,"z":0}},{"position":{"x":-577.042024551239,"y":25,"z":622.6259455155661},"rotation":{"x":0,"y":-0.7116047154242783,"z":0}},{"position":{"x":-614.8892507948365,"y":25,"z":584.2142690477762},"rotation":{"x":0,"y":-0.8416757279170469,"z":0}},{"position":{"x":-644.9683384845421,"y":25,"z":539.7121180716889},"rotation":{"x":0,"y":-0.9916546415098887,"z":0}},{"position":{"x":-668.9962124045564,"y":25,"z":490.97202237427854},"rotation":{"x":0,"y":-1.1576446874912947,"z":0}},{"position":{"x":-685.3914561073839,"y":25,"z":438.8843104779493},"rotation":{"x":0,"y":-1.3462728209077204,"z":0}},{"position":{"x":-694.8493605943019,"y":25,"z":387.20585033832236},"rotation":{"x":0,"y":-1.3853555813121854,"z":0}},{"position":{"x":-703.1888469272251,"y":25,"z":334.1764440013135},"rotation":{"x":0,"y":-1.467299602028278,"z":0}},{"position":{"x":-708.0934165679733,"y":25,"z":283.78965900040157},"rotation":{"x":0,"y":-1.467299602028278,"z":0}},{"position":{"x":-711.125996115183,"y":25,"z":230.57647518533068},"rotation":{"x":0,"y":-1.5553322199533512,"z":0}},{"position":{"x":-715.5125396612696,"y":25,"z":179.4198378328954},"rotation":{"x":0,"y":-1.5553322199533512,"z":0}},{"position":{"x":-717.7935102900057,"y":25,"z":125.9402938966613},"rotation":{"x":-3.141592653589793,"y":-1.5490331192776212,"z":-3.141592653589793}},{"position":{"x":-723.624369445429,"y":25,"z":72.58834121136772},"rotation":{"x":-3.141592653589793,"y":-1.5490331192776212,"z":-3.141592653589793}},{"position":{"x":-723.6200406314405,"y":25,"z":19.357101648930282},"rotation":{"x":-3.141592653589793,"y":-1.5490331192776212,"z":-3.141592653589793}},{"position":{"x":-721.7114353551426,"y":25,"z":-31.757950606988363},"rotation":{"x":-3.141592653589793,"y":-1.5490331192776212,"z":-3.141592653589793}},{"position":{"x":156.73609141705782,"y":25,"z":188.97748611342925},"rotation":{"x":0,"y":-1.1821677327726767,"z":0}},{"position":{"x":183.81884672478202,"y":25,"z":238.73446417376886},"rotation":{"x":0,"y":-0.9135176697548446,"z":0}},{"position":{"x":496.4917993253048,"y":25,"z":545.2747844256979},"rotation":{"x":0,"y":-0.9239607112157895,"z":0}},{"position":{"x":-452.5910056814174,"y":25,"z":178.2197067024308},"rotation":{"x":0,"y":-1.243252697008779,"z":0}},{"position":{"x":-425.586061520776,"y":25,"z":225.6506332158537},"rotation":{"x":0,"y":-1.0537607457287939,"z":0}},{"position":{"x":-390.9576871422431,"y":25,"z":271.49895734994806},"rotation":{"x":0,"y":-0.8842006692018007,"z":0}},{"position":{"x":-354.65507604841576,"y":25,"z":309.7552701170992},"rotation":{"x":0,"y":-0.8042936838468704,"z":0}},{"position":{"x":-307.8939483898392,"y":25,"z":344.1130679845912},"rotation":{"x":0,"y":-0.5047856879228325,"z":0}},{"position":{"x":211.59296335992605,"y":25,"z":281.30868415853723},"rotation":{"x":0,"y":0.6561203352425808,"z":0}},{"position":{"x":219.5928253064642,"y":25,"z":339.5496518434071},"rotation":{"x":0,"y":0.6561203352425808,"z":0}},{"position":{"x":168.48094125672412,"y":25,"z":359.0531850390007},"rotation":{"x":0,"y":0.47093229304487894,"z":0}},{"position":{"x":116.68223611513072,"y":25,"z":379.6754696862898},"rotation":{"x":0,"y":0.251729309600873,"z":0}},{"position":{"x":66.23828373787964,"y":25,"z":389.2911291445323},"rotation":{"x":0,"y":0.2144803133556244,"z":0}},{"position":{"x":12.859825379711435,"y":25,"z":396.2643685315828},"rotation":{"x":0,"y":0.08971830687598456,"z":0}},{"position":{"x":-40.435582799729985,"y":25,"z":399.1718858158936},"rotation":{"x":0,"y":-0.031109692380568234,"z":0}},{"position":{"x":-94.33501848448817,"y":25,"z":394.98605490177584},"rotation":{"x":0,"y":-0.18461069568087865,"z":0}},{"position":{"x":-258.39717300350634,"y":25,"z":366.5968538956758},"rotation":{"x":0,"y":-0.32297370181002993,"z":0}},{"position":{"x":-199.0391145540001,"y":25,"z":379.19244314350976},"rotation":{"x":0,"y":-0.14809068606807935,"z":0}},{"position":{"x":-147.86399219148382,"y":25,"z":386.3329529403164},"rotation":{"x":0,"y":-0.14809068606807935,"z":0}},{"position":{"x":-719.2278896285254,"y":25,"z":-83.95023763322654},"rotation":{"x":0,"y":-0.04961769443201493,"z":0}},{"position":{"x":-718.424956537953,"y":25,"z":-134.24026423119568},"rotation":{"x":0,"y":-0.04961769443201493,"z":0}},{"position":{"x":-720.123142109356,"y":25,"z":-185.40860271573766},"rotation":{"x":0,"y":-0.04961769443201493,"z":0}},{"position":{"x":-719.3202090305124,"y":25,"z":-235.6986266091203},"rotation":{"x":0,"y":-0.04961769443201493,"z":0}},{"position":{"x":-718.5172759643827,"y":25,"z":-285.9886492002772},"rotation":{"x":0,"y":-0.04961769443201493,"z":0}},{"position":{"x":-716.7540508989678,"y":25,"z":-339.46700204501246},"rotation":{"x":0,"y":-0.04440669096257484,"z":0}},{"position":{"x":-711.6948869785939,"y":25,"z":-393.8646943285414},"rotation":{"x":0,"y":-0.19340368595271837,"z":0}},{"position":{"x":-700.4869176845654,"y":25,"z":-447.0996460564116},"rotation":{"x":0,"y":-0.35325970059083306,"z":0}},{"position":{"x":-420.14014361265447,"y":25,"z":-298.6236008353453},"rotation":{"x":-3.141592653589793,"y":-1.48217219543677,"z":-3.141592653589793}},{"position":{"x":-385.1918394912004,"y":25,"z":-347.6690679616247},"rotation":{"x":-3.141592653589793,"y":-1.48217219543677,"z":-3.141592653589793}},{"position":{"x":-342.99418888904086,"y":25,"z":-393.4234065351379},"rotation":{"x":-3.141592653589793,"y":-1.3824718575012502,"z":-3.141592653589793}},{"position":{"x":-158.12036118289348,"y":25,"z":-459.0915635158154},"rotation":{"x":0,"y":-1.5581904516854461,"z":0}},{"position":{"x":-209.6173728620452,"y":25,"z":-458.5788657173005},"rotation":{"x":0,"y":-1.5581904516854461,"z":0}},{"position":{"x":-259.7438178752458,"y":25,"z":-458.07018430520304},"rotation":{"x":0,"y":-1.5581904516854461,"z":0}},{"position":{"x":-312.5275484417561,"y":25,"z":-443.29512114430577},"rotation":{"x":0,"y":-1.5581904516854461,"z":0}},{"position":{"x":-128.40585474402022,"y":25,"z":-723.1464859419166},"rotation":{"x":-3.141592653589793,"y":-1.5447262164651006,"z":-3.141592653589793}},{"position":{"x":-179.08276584178685,"y":25,"z":-720.6921778376003},"rotation":{"x":-3.141592653589793,"y":-1.5447262164651006,"z":-3.141592653589793}},{"position":{"x":-232.83556331065037,"y":25,"z":-717.0160712205079},"rotation":{"x":0,"y":-1.4663239663984633,"z":0}},{"position":{"x":-283.5310113881227,"y":25,"z":-711.0795548279676},"rotation":{"x":0,"y":-1.4663239663984633,"z":0}},{"position":{"x":-680.3526025724766,"y":25,"z":-495.3347180126309},"rotation":{"x":0,"y":-0.43183268333405633,"z":0}},{"position":{"x":-654.5724629043625,"y":25,"z":-541.7444916206123},"rotation":{"x":0,"y":-0.5020717009567062,"z":0}},{"position":{"x":-625.1010948179834,"y":25,"z":-585.859605054405},"rotation":{"x":0,"y":-0.5776717115817884,"z":0}},{"position":{"x":-590.0030741630151,"y":25,"z":-627.5004393786916},"rotation":{"x":0,"y":-0.7420106583699526,"z":0}},{"position":{"x":-547.0576198409784,"y":25,"z":-664.5098052074037},"rotation":{"x":0,"y":-1.0227116810148802,"z":0}},{"position":{"x":-494.6869061156621,"y":25,"z":-686.9777858840876},"rotation":{"x":0,"y":-1.3038897005408299,"z":0}},{"position":{"x":-442.92892742552675,"y":25,"z":-697.7910782010356},"rotation":{"x":0,"y":-1.4104437736342128,"z":0}},{"position":{"x":-389.4151379487099,"y":25,"z":-706.4893284610486},"rotation":{"x":0,"y":-1.478128614560676,"z":0}},{"position":{"x":-336.26058104005693,"y":25,"z":-711.3167312956118},"rotation":{"x":0,"y":-1.5079398009666125,"z":0}},{"position":{"x":-106.99540413549222,"y":25,"z":-465.73861009963844},"rotation":{"x":0,"y":-1.5693314829139293,"z":0}},{"position":{"x":-55.90370137740166,"y":25,"z":-469.18184861492733},"rotation":{"x":0,"y":-1.5693314829139293,"z":0}}],"items":[]}',
]
var prebuiltBrainJSON = [
	'{"layers":[{"out_depth":52,"out_sx":1,"out_sy":1,"layer_type":"input"},{"out_depth":4,"out_sx":1,"out_sy":1,"layer_type":"fc","num_inputs":52,"l1_decay_mul":0,"l2_decay_mul":1,"filters":[{"sx":1,"sy":1,"depth":52,"w":{"0":0.1921290765427112,"1":0.09200407742065006,"2":0.004481054862607681,"3":0.0002489734736828941,"4":0.2804016832230358,"5":0.01499736857612659,"6":0.09435710309482247,"7":0.19653381859069763,"8":-0.04500122628884746,"9":0.08230712695383441,"10":0.3037228387885169,"11":0.09167513977657898,"12":0.24898273079746555,"13":0.20188105876876508,"14":0.06021451903199744,"15":-0.05286396576687521,"16":-0.017478116097862588,"17":0.12293923928394655,"18":0.19249409596545722,"19":-0.002297196850282526,"20":0.05124755335507948,"21":0.35418385630470506,"22":0.18031641270973645,"23":0.05787462391197391,"24":0.1346661823657584,"25":0.04021301525244064,"26":0.17073702223996337,"27":0.11561539260754453,"28":-0.06330971877079453,"29":-0.010135228152607367,"30":0.4254197099629057,"31":0.06213666109353201,"32":0.11048728382777921,"33":0.03933823879128976,"34":0.15564308273155208,"35":0.00882070012452427,"36":0.01928250306589993,"37":0.26372928595626,"38":0.009503253632296975,"39":0.38100294829895265,"40":0.08053221357452282,"41":0.11841307466739366,"42":0.28966329885629766,"43":0.17243149828383533,"44":0.2008255588547469,"45":-0.013895947939951185,"46":0.049934443144193846,"47":0.007717630343415098,"48":-0.00497534701148898,"49":-0.0023748290710960433,"50":-0.005784472147998907,"51":-0.005162946145843578}},{"sx":1,"sy":1,"depth":52,"w":{"0":0.092632340040052,"1":0.007198949965687114,"2":0.29713881664936215,"3":0.01912529767981348,"4":0.05289116453475037,"5":0.1382660704710075,"6":0.11503345838830326,"7":0.17369645936829847,"8":0.0008068920539234886,"9":0.047586499616726056,"10":0.23619616405986266,"11":0.025647216423824813,"12":0.14162194771435893,"13":0.13072420202507035,"14":0.05438655545505938,"15":0.13620624769240294,"16":0.031535855239736406,"17":0.16372025632779302,"18":-0.011756175094197392,"19":0.14903486277017997,"20":0.1414272238569692,"21":-0.02691277094428986,"22":0.10490904319429276,"23":0.2211782631253484,"24":0.20410739908493822,"25":0.04360129789597161,"26":0.019686399259713137,"27":0.1692542888096142,"28":-0.07963886982269376,"29":0.11260458779268145,"30":0.21078151156799185,"31":0.032358957075012386,"32":0.17300412169509022,"33":0.01297387111950422,"34":0.16374163969125685,"35":0.0875123738345825,"36":0.015998699426015704,"37":0.19845366763516273,"38":0.09821441939092228,"39":-0.03781817503712454,"40":0.12892855724728983,"41":0.2219971484079435,"42":0.22951964845466336,"43":0.06757120130231316,"44":0.20892548446040035,"45":0.04065102788494092,"46":0.17743634795283195,"47":0.02901374166772129,"48":0.0037055840197804213,"49":0.004773501247254868,"50":0.005088765667673876,"51":0.004694527311959147}},{"sx":1,"sy":1,"depth":52,"w":{"0":0.27085201270060283,"1":0.2153692988457172,"2":0.044335246131657326,"3":0.08549285773076044,"4":0.08599748373427497,"5":-0.036101938190228985,"6":0.2309872465877633,"7":0.1448066180365307,"8":0.14952826347550818,"9":0.19942832155182438,"10":0.30392303106423346,"11":0.10779580015957425,"12":0.12597995486727556,"13":0.236482573783543,"14":0.19277122320145448,"15":0.05144867523386482,"16":0.14187177131952614,"17":0.1954993937748773,"18":0.09612226066094647,"19":0.2099760150346077,"20":-0.12520101500095773,"21":0.23004528318488413,"22":0.12221800999991202,"23":0.0793953821044759,"24":0.010278323800406894,"25":-0.0767980467018205,"26":0.024294662824456314,"27":0.14493095297831607,"28":0.06132324707192981,"29":0.21129833947913784,"30":0.034765522677680745,"31":0.04312578171502179,"32":0.08344583604883483,"33":-0.21921209988022908,"34":-0.10419735147828177,"35":0.30151549007149075,"36":0.2102248837074792,"37":-0.21534804458557222,"38":-0.03376979100486373,"39":0.1918009807814128,"40":0.18765356871594005,"41":0.1430065262657976,"42":-0.14554091289785956,"43":0.14369165382405075,"44":0.2564040992019524,"45":0.26988432634830384,"46":0.10428634780589807,"47":0.09457948908549557,"48":0.007404562133800488,"49":0.009671877467246445,"50":0.008641270559103364,"51":0.008474277728301957}},{"sx":1,"sy":1,"depth":52,"w":{"0":0.2639376974497968,"1":-0.07898268557022527,"2":-0.06286860755816899,"3":0.08713119213025704,"4":0.1531207084364503,"5":0.029123489814892104,"6":0.03289767377275853,"7":0.09255686571673102,"8":0.009053745676413205,"9":0.13409873382799983,"10":0.04199657609706756,"11":-0.01858477289376499,"12":-0.12472986483686974,"13":0.2667635527372794,"14":0.08234396855462182,"15":-0.023239305315616677,"16":0.08663048956395283,"17":0.22549797636776345,"18":0.10568207846537479,"19":0.09414264378173327,"20":0.1534763189615289,"21":0.24165355367783228,"22":-0.024880236197668805,"23":0.21885556887690713,"24":0.1810832342366367,"25":0.05253355026263209,"26":0.31220193026489845,"27":0.25146255624668606,"28":0.017660918793975425,"29":-0.008796563007337988,"30":0.22319457574457888,"31":0.2692981534056488,"32":-0.08242864515700038,"33":0.29524671933563135,"34":0.3079832948385981,"35":0.2555438586952949,"36":0.07416305047757206,"37":0.09622820975781063,"38":0.1072935380853054,"39":0.04269213698073868,"40":0.2796769039927428,"41":0.02433267975272653,"42":0.08741429535926862,"43":0.30632696879551063,"44":0.017129645493010673,"45":-0.20948337261540043,"46":0.3144161556874471,"47":-0.058385040008511024,"48":0.005383489164315229,"49":0.00793124361634962,"50":0.007912754502388753,"51":0.007138124039673789}}],"biases":{"sx":1,"sy":1,"depth":4,"w":{"0":0.012389111958761802,"1":0.03295309710665872,"2":-0.016270599158927666,"3":-0.0055687477173326835}}},{"out_depth":4,"out_sx":1,"out_sy":1,"layer_type":"regression","num_inputs":4}]}',
]



window.onload = function() {
	init();
	animate();
}


// initialize window
function init() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// camera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 4200);
	//camera.position.y = 400;
	//camera.position.z = 800;
	camera.position.set(-800, 550, 550);
	camera.lookAt(new THREE.Vector3(0, 0, 0))

	// robot camera
	robotCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 4200);

	// controls
	controls = new THREE.OrbitControls(camera);
	controls.keys = {};
	controls.maxDistance = 1500;
	controls.minDistance = 200;
	controls.damping = 0.2;

	// scene
	scene = new THREE.Scene();

	// env
	env = new Env();
	env.initEnv(scene, camera);

	// light
	light = new THREE.PointLight();
	light.position.set(900, 500, 900);
	scene.add(light);

	light = new THREE.PointLight();
	light.position.set(-1000, 600, -1000);
	scene.add(light);



/*
	var texture = THREE.ImageUtils.loadTexture("./assets/textures/soccer.png");
	texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
	var material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 1, bumpMap: texture});
	var geometry = new THREE.SphereGeometry(25, 32, 32 );
	var sphere = new THREE.Mesh( geometry, material );
	sphere.position.y = 22;
	scene.add( sphere );

	var texture = THREE.ImageUtils.loadTexture("./assets/textures/cola.png");
	texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
	var material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide, transparent: true, opacity: 1});
	var geometry = new THREE.CylinderGeometry(35, 25, 80, 32, 1, true);
	var cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.y = 40;
	cylinder.position.x = 50;
	scene.add( cylinder );
*/
	// window resize
	window.addEventListener("resize", onWindowResize, false);
	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		robotCamera.aspect = window.innerWidth / window.innerHeight;
		robotCamera.updateProjectionMatrix();

		document.getElementById("robotView").style.width = (window.innerWidth / 3) + "px";
		document.getElementById("robotView").style.height = (window.innerHeight / 3) + "px";

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	onWindowResize();
}


// called per frame
function animate() {	
	requestAnimationFrame(animate);
	delta = Math.min(clock.getDelta(), 0.1);
	var time = clock.getElapsedTime() * 5;
	controls.update(delta);

	env.update(delta);

	// rendering
	renderer.autoClear = false;

	// renderer to viewport
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);

	// renderer robot camera
	var car = env.getCarSelected();
	if(car) {
		var robotCameraPos = car.directionVector.clone().multiplyScalar(car.cameraOffset);
		robotCameraPos.addVectors(robotCameraPos, car.mesh.position);
		robotCamera.position.set(robotCameraPos.x, robotCameraPos.y, robotCameraPos.z);
		var robotLookAt = robotCameraPos.addVectors(robotCameraPos, car.directionVector.clone());
		robotCamera.lookAt(robotLookAt);
	} else {
		robotCamera.position.set(camera.position.x, camera.position.y, camera.position.z);
		robotCamera.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
	}
	//robotCamera.position.y = 300;
	//robotCamera.lookAt(car.mesh.position.clone());
	renderer.setViewport(window.innerWidth/3*2, window.innerHeight/3*2, window.innerWidth/3, window.innerHeight/3);
	renderer.clearDepth();
	renderer.render(scene, robotCamera);
}



