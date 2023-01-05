import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { byTestId, createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AppValidators } from '@saanbo/common/core/utils/validators';

import { ValidationMessageComponent } from '../validation-message/validation-message.component';

import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let spectator: SpectatorHost<LabelComponent>;

  const createSpectator = createHostFactory({
    component: LabelComponent,
    declarations: [ValidationMessageComponent],
    imports: [ReactiveFormsModule, FormsModule],
  });

  describe('label text', () => {
    describe('is specified', () => {
      it('renders it', () => {
        const labelText = 'Test label';

        spectator = createSpectator(`<saanboc-label labelText="${labelText}"></saanboc-label>`);

        expect(spectator.query(byTestId('label'))).toHaveText(labelText);
      });
    });

    describe('is not specified', () => {
      it('does not render it', () => {
        spectator = createSpectator(`<saanboc-label></saanboc-label>`);

        expect(spectator.query(byTestId('label'))).toBeNull();
      });
    });
  });

  describe('content', () => {
    const contentText = 'Hello';

    beforeEach(() => {
      spectator = createSpectator(`<saanboc-label><span data-testid="message">${contentText}</span></saanboc-label>`);
    });

    it('is rendered', () => {
      expect(spectator.query(byTestId('message'))).toHaveText(contentText);
    });
  });

  describe('error message', () => {
    describe('from reactive control', () => {
      let hostControlName: string;
      let hostControl: FormControl;

      beforeEach(() => {
        hostControlName = 'testControl';
        hostControl = new FormControl('');

        spectator = createSpectator(`<saanboc-label><input [formControl]="${hostControlName}"></saanboc-label>`, {
          hostProps: {
            [hostControlName]: hostControl,
          },
        });
      });

      describe('with error', () => {
        it('renders an error', () => {
          const errorText = 'Test error';

          hostControl.setErrors(AppValidators.buildAppError(errorText));
          spectator.detectChanges();

          expect(spectator.query(byTestId('error'))).toHaveText(errorText);
        });
      });

      describe('without error', () => {
        it('does not render an error', () => {
          expect(spectator.query(byTestId('error'))).toHaveExactText('');
        });
      });
    });

    describe('from ngModel', () => {
      beforeEach(() => {
        const ngModelPropertyKey = 'testProperty';
        spectator = createSpectator(`<saanboc-label><input type="text" [ngModel]=${ngModelPropertyKey}></saanboc-label>`);
      });

      it('does not render an error', () => {
        expect(spectator.query(byTestId('error'))).toHaveExactText('');
      });
    });

    describe('from prop', () => {
      describe('with initial error', () => {
        it('renders an error right away', () => {
          const errorText = 'Test error';

          spectator = createSpectator(`<saanboc-label errorText="${errorText}"></saanboc-label>`);

          expect(spectator.query(byTestId('error'))).toHaveText(errorText);
        });
      });

      describe('without initial error', () => {
        it('does not render an error', () => {
          spectator = createSpectator(`<saanboc-label></saanboc-label>`);

          expect(spectator.query(byTestId('error'))).toHaveExactText('');
        });

        it('updates error if it is passed later', () => {
          const errorText = 'Test error';

          spectator = createSpectator(`<saanboc-label></saanboc-label>`);

          spectator.setInput({ errorText });
          spectator.detectChanges();

          expect(spectator.query(byTestId('error'))).toHaveText(errorText);
        });
      });
    });
  });
});
