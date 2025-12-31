import FormsPage from '../pages/forms.js';

const forms = new FormsPage();

describe('Forms', () => {
    before(async () => {
        await forms.open();
    });

    it('Cadastrar formulário com sucesso', async () => {
        await forms.fillForm('Teste automation mobile');

        const alertText = await forms.getAlertText();
        expect(alertText).toBeTruthy();
        expect(alertText).toContain("This button is active");

        await forms.acceptAlert();
    });
});
