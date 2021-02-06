/**
 * @description All arguments a scene can recieve as configuration.
 *
 * @author Maxence Leguede
 * @since 1.0.0
 * @access public
 */

interface SceneConfiguration {
    id: string;
    transitionIn?: Function;
    transitionOut?: Function;
    scrollBehavior?: ScrollBehavior;
}
