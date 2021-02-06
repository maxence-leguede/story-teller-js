//@import<<dir '/multi-files/'

/**
 * @description Create a new scene to the page.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Scene {
    /**
     * @description Create a new scene
     * @param id Id of the current scene
     * @param order The order when the scene will be shown.
     */
    constructor(id, order) {
        this.id = id;
        this.order = order;
    }
    /**
     * @description Setup the current scene configuration (transitions, scroll type...)
     * @param configuration Current scene configuration
     */
    loadConfiguration(configuration) {
        this.transitionIn = configuration.transitionIn
            ? configuration.transitionIn
            : null;
        this.transitionOut = configuration.transitionOut
            ? configuration.transitionOut
            : null;
        this.scrollBehavior = configuration.scrollBehavior
            ? configuration.scrollBehavior
            : 'smooth';
    }
    /**
     * @description Scrolls to the current scene
     */
    scrollTo() {
        const scrollBehavior = this.scrollBehavior;
        return new Promise((resolve, reject) => {
            const currentScene = document.getElementById(this.id);
            if (currentScene) {
                setTimeout(function () {
                    currentScene.scrollIntoView({
                        behavior: scrollBehavior,
                    });
                    resolve();
                }, 200);
            }
            else {
                reject(`There is no element with id "${this.id}" in the page.`);
            }
        });
    }
    /**
     * @description Set the current scene scroll type
     * @param behavior New scroll type. Can be "auto", "smooth" or "instant"
     */
    setSceneScrollBehavior(behavior) {
        this.scrollBehavior = behavior;
    }
    /**
     * @description Change the scene order of appearance
     * @param newOrder The new order of the scene
     */
    changeSceneOrder(newOrder) {
        this.order = newOrder;
    }
    /**
     * @description Set the scene transition that will be played when the window scrolls in this scene.
     * @param fnc Function to execute as transition
     */
    setTransitionIn(fnc) {
        this.transitionIn = fnc;
    }
    /**
     * @description Set the scene transition that will be played when the window scrolls out of this scene.
     * @param fnc Function to execute as transition
     */
    setTransitionOut(fnc) {
        this.transitionOut = fnc;
    }
    /**
     * Execute a transition function before scrolling
     * @param fnc The function to execute
     */
    transition(fnc) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fnc) {
                if (typeof fnc !== 'function')
                    throw new Error("StoryTeller.js (transition) : Error during transition, provided transitionIn or transitionOut isn't a function.");
                return fnc(this.id);
            }
            return;
        });
    }
}

/**
 * @description All arguments a scene can recieve as configuration.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 */

/**
 * Class used to create a Story Teller instance.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 * @requires Scene.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StoryTeller {
    /**
     * @description Creates a new instance of StoryTeller
     */
    constructor() {
        this.inScroll = false;
        this.inAnim = false;
        this.scenes = [];
        // Set the event handler to the wheel event listener
        let scrollEventHandler = this.createScrollEventHandler();
        window.addEventListener('wheel', scrollEventHandler, {
            passive: false,
        });
    }
    /**
     * @description Setup default scenes on the page and their configuration
     * @param scenes Scenes configuration
     */
    load(scenes) {
        scenes.forEach((sceneConfig) => {
            this.addScene(sceneConfig.id, sceneConfig);
        });
    }
    /**
     * Add a new scene to the story telling
     * @param id New scene element id
     * @param configuration Configuration that has to be set for this scene
     */
    addScene(id, configuration) {
        if (document.getElementById(id) == null) {
            throw new Error(`StoryTeller.js (addScene) : There is no element with id "${id}".`);
        }
        if (this.getScene(id)) {
            throw new Error(`StoryTeller.js (addScene) : A scene with the id "${id}" already exists.`);
        }
        const sceneOrder = this.scenes.length + 1;
        const scene = new Scene(id, sceneOrder);
        if (configuration)
            scene.loadConfiguration(configuration);
        this.scenes.push(scene);
        if (this.currentScene == null) {
            this.currentScene = scene;
            this.currentScene.scrollTo();
        }
        return this;
    }
    removeScene(id) {
        const scene = this.getScene(id);
        if (scene == null) {
            throw new Error(`StoryTeller.js (addScene) : A scene with the id "${id}" doesn't exist.`);
        }
        this.scenes
            .filter((remainingScenes) => remainingScenes.id !== id &&
            remainingScenes.order >= scene.order)
            .forEach((remainingScenes) => remainingScenes.changeSceneOrder(remainingScenes.order - 1));
        this.scenes = this.scenes.filter((remainingScenes) => remainingScenes.id !== scene.id);
        return this;
    }
    /**
     * @description Get an existing scene of the page by its id
     * @param id Scene element id
     */
    getScene(id) {
        const scene = this.scenes.filter((scene) => scene.id === id);
        if (scene.length > 0) {
            return scene.pop();
        }
        return null;
    }
    /**
     * @description Get an existing scene of the page by its order
     * @param order Scene order
     */
    getSceneByOrder(order) {
        const scene = this.scenes.filter((scene) => scene.order == order);
        if (scene.length > 0) {
            return scene.pop();
        }
        return null;
    }
    /**
     * @description Change the specified scene order
     * @param id Scene element id
     * @param newOrder New order to apply to the scene
     */
    changeSceneOrder(id, newOrder) {
        const modifiedScene = this.getScene(id);
        if (!modifiedScene) {
            throw new Error(`StoryTeller.js (changeSceneOrder) : There is no scene with the id "${id}".`);
        }
        this.scenes
            .filter((scene) => scene.id !== id && scene.order >= newOrder)
            .forEach((scene) => scene.changeSceneOrder(scene.order + 1));
        modifiedScene.changeSceneOrder(newOrder);
        this.scenes.sort((a, b) => a.order - b.order);
    }
    /**
     * Scrolls to the new scene, specified by its order, and apply the transitions (out and in)
     * @param newOrder New scene order that will be rendered
     * @param scrollToBottom  True if the we are scrolling to the bottom to access to the element
     */
    renderTransition(newOrder, scrollToBottom) {
        return __awaiter(this, void 0, void 0, function* () {
            this.inAnim = true;
            const newScene = this.getSceneByOrder(newOrder);
            yield this.currentScene.transition(this.currentScene.transitionOut);
            this.currentScene = newScene;
            yield this.currentScene.scrollTo();
            yield this.currentScene.transition(this.currentScene.transitionIn);
            this.inAnim = false;
        });
    }
    /**
     * Create an event handler that will be called each time the user tries to scroll
     */
    createScrollEventHandler() {
        return (event) => {
            // Cancels the scroll
            event.preventDefault();
            // If the user isn't actually in a transition or introduction
            if (!this.inScroll && !this.inAnim) {
                // Check if the user scrolls to top or not
                const toTop = event.deltaY > 0;
                this.inScroll = true;
                // Comming back to the scene, after the scroll
                //this.currentScene.scrollTo();
                setTimeout(() => {
                    this.inScroll = false;
                }, 500);
                // Render the transition to the new scene
                if (toTop) {
                    if (this.scenes.length >= this.currentScene.order + 1) {
                        this.renderTransition(this.currentScene.order + 1, true);
                    }
                }
                else {
                    if (this.currentScene.order - 1 > 0) {
                        this.renderTransition(this.currentScene.order - 1, false);
                    }
                }
            }
        };
    }
}

