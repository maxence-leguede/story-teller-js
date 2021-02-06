/**
 * @description Create a new scene to the page.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 */

class Scene {
    id: string;
    order: number;
    transitionIn: Function;
    transitionOut: Function;
    private scrollBehavior: ScrollBehavior;

    /**
     * @description Create a new scene
     * @param id Id of the current scene
     * @param order The order when the scene will be shown.
     */
    constructor(id: string, order: number) {
        this.id = id;
        this.order = order;
    }

    /**
     * @description Setup the current scene configuration (transitions, scroll type...)
     * @param configuration Current scene configuration
     */
    loadConfiguration(configuration: SceneConfiguration) {
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
        return new Promise((resolve: Function, reject: Function) => {
            const currentScene = document.getElementById(this.id);
            if (currentScene) {
                setTimeout(function () {
                    currentScene.scrollIntoView({
                        behavior: scrollBehavior,
                    });
                    resolve();
                }, 200);
            } else {
                reject(`There is no element with id "${this.id}" in the page.`);
            }
        });
    }

    /**
     * @description Set the current scene scroll type
     * @param behavior New scroll type. Can be "auto", "smooth" or "instant"
     */
    setSceneScrollBehavior(behavior: ScrollBehavior) {
        this.scrollBehavior = behavior;
    }

    /**
     * @description Change the scene order of appearance
     * @param newOrder The new order of the scene
     */
    changeSceneOrder(newOrder: number) {
        this.order = newOrder;
    }

    /**
     * @description Set the scene transition that will be played when the window scrolls in this scene.
     * @param fnc Function to execute as transition
     */
    setTransitionIn(fnc: Function) {
        this.transitionIn = fnc;
    }

    /**
     * @description Set the scene transition that will be played when the window scrolls out of this scene.
     * @param fnc Function to execute as transition
     */
    setTransitionOut(fnc: Function) {
        this.transitionOut = fnc;
    }

    /**
     * Execute a transition function before scrolling
     * @param fnc The function to execute
     */
    async transition(fnc: Function) {
        if (fnc) {
            if (typeof fnc !== 'function')
                throw new Error(
                    "StoryTeller.js (transition) : Error during transition, provided transitionIn or transitionOut isn't a function.",
                );
            return fnc(this.id);
        }
        return;
    }
}
