import fs from 'fs';
import path from 'path';
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

    it('Cadastrar formulário com sucesso via JSON', async () => {
        const formData = JSON.parse(fs.readFileSync(path.resolve('tests/data/form.json'),'utf-8'));

        await forms.fillForm(formData.text, formData.switchOn, formData.dropdownValue, formData.button);

        const alertText = await forms.getAlertText();
        expect(alertText).toBeTruthy();
        expect(alertText).toContain("This button is active");

        await forms.acceptAlert();
    });
});
