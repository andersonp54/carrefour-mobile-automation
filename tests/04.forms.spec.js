import FormsPage from '../pages/forms.js';

const forms = new FormsPage();

describe('Forms', () => {
    it('Cadastrar formulário com sucesso', async () => {
        await forms.open();

        await forms.fillForm('Teste automation mobile');

        const alertText = await forms.getAlertText();
        expect(alertText).toBeTruthy();
        expect(alertText).toContain("This button is");
        expect(alertText).toContain("This button is active");

        await driver.acceptAlert();
    });
});
