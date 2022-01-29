describe('EditableSpan', () => {
    it('base example, visually looks correct', async () => {

        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-story&args=&viewMode=story');

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });
});

