import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  
  constructor(public translate: TranslateService) {
    // I used English and italian for demo
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|it/) ? browserLang : 'en');		
  }
}
