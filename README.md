# StoryTeller.js
![](demo.gif)


![version](https://img.shields.io/badge/version-1.0.0-green.svg) ![license](https://img.shields.io/github/license/maxence-leguede/story-teller-js) ![issues](https://img.shields.io/github/issues-raw/maxence-leguede/story-teller-js) ![contributors](https://img.shields.io/github/contributors/maxence-leguede/story-teller-js ) ![commit](https://img.shields.io/github/last-commit/maxence-leguede/story-teller-js)

## Presentation
A JavaScript open source framework to build modern story telling web pages.

Find out how to contribute by reading the [contributing guide](https://github.com/maxence-leguede/story-teller-js/blob/main/CONTRIBUTING.md).

Don't forget to read the [Code of Conduct](https://github.com/maxence-leguede/story-teller-js/blob/main/CODE-OF-CONDUCT.md).
_

> **You also can discover the demo code in the "demo" folder.**

## Git

To download the latest version of StoryTeller.js, execute this command : 

    git clone https://github.com/maxence-leguede/story-teller-js.git

## Issues

It is possible that you experience some issues while using StoryTeller, especially with the first version of it. Please,  first verify that you are using the latest version and then report the issue by [clicking here](https://github.com/maxence-leguede/story-teller-js/issues).

## Get started

It is very simple to use StoryTeller.js :

 - Download  the latest release [here](https://github.com/maxence-leguede/story-teller-js/releases)
- Import the javascript file to your project. We highly recommand the **StoryTeller.min.js** version as it is a lighter version.
- Create a StoryTeller instance and configure the scenes :

```javascript
const storyTeller = new StoryTeller().load([
	{
		id:  'scene-1',
		scrollBehavior: 'smooth'
	},
	{
		id:  'scene-2',
		scrollBehavior: 'auto',
		transitionIn: () => console.log("Getting in scene 2 !"),
		transitionOut: () => console.log("Leaving scene 2..."),
	},
	{
		id:  'scene-3',
		scrollBehavior: 'instant',
		transitionIn: () => console.log("Getting in scene 3 !"),
		transitionOut: () => console.log("Leaving scene 3..."),
	},
]);
```

## Other informations

You can dynamically add a scene, get a scene and remove a scene.

- Get a scene :
```javascript
const  storyTeller = new StoryTeller()
						  .addScene('scene-1');
						  
// Get the scene by its id
console.log(storyTeller.getScene('scene-1'));

// Get the scene by its order
console.log(storyTeller.getSceneByOrder(1));
```

- Add a scene : 
```javascript
const storyTeller = new StoryTeller().addScene("scene-1")
```

> **You can also provide a configuration to the scene :**

```javascript
const storyTeller = new StoryTeller().addScene("scene-1", {
	scrollBehavior: 'smooth',
	transitionIn: () => console.log("Getting in scene 2 !"),
	transitionOut: () => console.log("Leaving scene 2..."),
})
```

- Remove a scene :
```javascript
const  storyTeller = new StoryTeller()
						  .addScene('scene-1')
						  .removeScene('scene-1');
						  
// This will return null as the scene doesn't exist anymore.
console.log(storyTeller.getScene('scene-1'));
```

---
> **Note that you can combine add and remove multiple times :**

```javascript
const  storyTeller = new StoryTeller()
						  .addScene('scene-1')
						  .addScene('scene-2')
						  .addScene('scene-3')
						  .addScene('scene-4')
						  .removeScene('scene-1')
						  .removeScene('scene-3');

console.log(storyTeller.getScene('scene-1')); // returns null
console.log(storyTeller.getScene('scene-2')); // returns a scene object
console.log(storyTeller.getScene('scene-3')); // returns null
console.log(storyTeller.getScene('scene-4')); // returns a scene object
```