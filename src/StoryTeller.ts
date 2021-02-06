/**
 * Class used to create a Story Teller instance.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 * @requires Scene.ts
 */

class StoryTeller {
    scenes: Array<Scene>;
    currentScene: Scene;

    private inScroll: boolean = false;
    private inAnim: boolean = false;

    /**
     * @description Creates a new instance of StoryTeller
     */
    constructor() {
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
    load(scenes: Array<SceneConfiguration>) {
        scenes.forEach((sceneConfig) => {
            this.addScene(sceneConfig.id, sceneConfig);
        });
    }

    /**
     * Add a new scene to the story telling
     * @param id New scene element id
     * @param configuration Configuration that has to be set for this scene
     */
    addScene(id: string, configuration?: SceneConfiguration): StoryTeller {
        if (document.getElementById(id) == null) {
            throw new Error(
                `StoryTeller.js (addScene) : There is no element with id "${id}".`,
            );
        }

        if (this.getScene(id)) {
            throw new Error(
                `StoryTeller.js (addScene) : A scene with the id "${id}" already exists.`,
            );
        }

        const sceneOrder = this.scenes.length + 1;
        const scene = new Scene(id, sceneOrder);
        if (configuration) scene.loadConfiguration(configuration);

        this.scenes.push(scene);

        if (this.currentScene == null) {
            this.currentScene = scene;
            this.currentScene.scrollTo();
        }

        return this;
    }

    removeScene(id: string): StoryTeller {
        const scene = this.getScene(id);
        if (scene == null) {
            throw new Error(
                `StoryTeller.js (addScene) : A scene with the id "${id}" doesn't exist.`,
            );
        }

        this.scenes
            .filter(
                (remainingScenes) =>
                    remainingScenes.id !== id &&
                    remainingScenes.order >= scene.order,
            )
            .forEach((remainingScenes) =>
                remainingScenes.changeSceneOrder(remainingScenes.order - 1),
            );

        this.scenes = this.scenes.filter(
            (remainingScenes) => remainingScenes.id !== scene.id,
        );

        return this;
    }

    /**
     * @description Get an existing scene of the page by its id
     * @param id Scene element id
     */
    getScene(id: string): Scene {
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
    getSceneByOrder(order: number): Scene {
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
    changeSceneOrder(id: string, newOrder: number) {
        const modifiedScene = this.getScene(id);
        if (!modifiedScene) {
            throw new Error(
                `StoryTeller.js (changeSceneOrder) : There is no scene with the id "${id}".`,
            );
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
    private async renderTransition(newOrder: number, scrollToBottom: boolean) {
        this.inAnim = true;
        const newScene = this.getSceneByOrder(newOrder);

        await this.currentScene.transition(this.currentScene.transitionOut);
        this.currentScene = newScene;
        await this.currentScene.scrollTo();
        await this.currentScene.transition(this.currentScene.transitionIn);
        this.inAnim = false;
    }

    /**
     * Create an event handler that will be called each time the user tries to scroll
     */
    private createScrollEventHandler() {
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
                        this.renderTransition(
                            this.currentScene.order + 1,
                            true,
                        );
                    }
                } else {
                    if (this.currentScene.order - 1 > 0) {
                        this.renderTransition(
                            this.currentScene.order - 1,
                            false,
                        );
                    }
                }
            }
        };
    }
}
