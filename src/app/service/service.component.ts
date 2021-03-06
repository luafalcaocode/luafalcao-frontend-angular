import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ServiceService } from '../services/pages/service.service';
import { CommonService } from '../services/layout/common.service';
import { LoadingService } from '../services/layout/loading.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  screen: string;
  services: any[];
  counts: any[];
  titulos: string[] = ['Para a sua necessidade', 'Para o seu negócio', 'Para automatizar uma tarefa burocrática'];
  component: any;
  backgroundHeader: string = 'black';
  backgroundMobile: string = 'black';
  backgroundMobileContainer: string = 'rgba(0, 0, 0, 0.9)';
  loading: any;
  active: boolean;
  tiposDeProjeto: any[];
  howWorks: string [];
  defaultStyle: any;

  constructor(public service: ServiceService, public commonService: CommonService, public loadingService: LoadingService, public router: ActivatedRoute, public elementRef: ElementRef) {
    this.defaultStyle = {};
  }

  onActiveReveal(event) {
    if (event) {
      this.component = event;
    }
  }

  ngOnInit() {
    this.commonService.setLayout(true);
    this.loading = this.elementRef.nativeElement.querySelector('.page-loading');
    this.router.params.subscribe(param => {
      this.loadingService.show(this.loading);
      this.screen = param.screen;
      this.service.initializePage(this.screen);
      this.services = this.service.services;
      this.howWorks = this.service.howWorks;
      this.tiposDeProjeto = this.service.tiposDeProjeto;
      this.counts = this.service.counts;

      if (this.component) {
        this.component.revealed = false;
      }
      this.loadingService.hide(this.loading);
    });
  }


  ngOnDestroy() {
   this.commonService.unsetLayout();
  }

  onClickOrder() {
    const orderForm = this.elementRef.nativeElement.querySelector('#order');
    orderForm.style.top = '0';
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
  }

  openUrl(url) {
    window.open(url)
  }
}
