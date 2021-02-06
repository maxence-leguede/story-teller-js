$(document).ready(() => {
    const storyTeller = new StoryTeller();

    storyTeller.load([
        {
            id: 'scene-1',
            transitionIn: () => {
                console.log('Load scene 1');
            },
            transitionOut: () => {
                console.log('Load scene 1');
            },
        },
        {
            id: 'scene-2',
            transitionIn: () => {
                console.log('Load scene 2');
            },
            transitionOut: () => {
                console.log('Load scene 2');
            },
        },
        {
            id: 'scene-3',
            transitionIn: () => {
                console.log('Load scene 3');
            },
            transitionOut: () => {
                console.log('Load scene 3');
            },
        },
        {
            id: 'scene-4',
            transitionIn: () => {
                console.log('Load scene 4');
            },
            transitionOut: () => {
                console.log('Load scene 4');
            },
        },
        {
            id: 'scene-5',
            transitionIn: () => {
                console.log('Load scene 5');
            },
            transitionOut: () => {
                console.log('Load scene 5');
            },
        },
        {
            id: 'scene-6',
            transitionIn: () => {
                console.log('Load scene 6');
            },
            transitionOut: () => {
                console.log('Load scene 6');
            },
        },
    ]);
});
