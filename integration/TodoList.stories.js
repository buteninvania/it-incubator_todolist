describe('TodoList', () => {
    it('base example, visually looks correct', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todolist-todolist--todo-list-story&viewMode=story');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});

