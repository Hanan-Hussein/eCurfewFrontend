import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notify } from '../../../../../shared/class/notify';
import { StewardService } from '../../../../../shared/services/steward/steward.service';


import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';



@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent implements OnInit, OnDestroy {

  
  totalAmountOfTopUpsToday: any;
  totalNumberOfTopUpsToday: any;
  totalBankaIncomeToday: any;
  totalBankaIncomeToDate: any;
  totalNumberOfTopUpsToDate: any;
  totalMerchantIncomeToDate: any;
  totalAmountOfTopUpsToDate: any;
  totalMerchantIncomeToday: any;

  dashboardData:any;
  allmerchantNames:any = [];
  index_ofMerchant:Number;
  selected:any[];
  finalDataToDisplay:any = [];
 
  subscription: Subscription;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Total No TopUps' },
    { data: [51, 39, 20, 51, 76, 59, 10], label: 'Total Collections' },
    { data: [23, 76, 70, 91, 86, 95, 20], label: 'Total Top ups' },
    
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation:any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: '#7AA3E5',
      backgroundColor: '#e4e5e652',
    },
    {
      borderColor: '#A8385D',
      backgroundColor: '#e4e5e652',
    },
    {
      borderColor: '#A27EA8',
      backgroundColor: '#e4e5e652',
    },
   
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  

  constructor(private stewardService: StewardService<any, any>,
              private notify: Notify) {
                this.subscription = new Subscription();
  }

  ngOnInit() {

    this.subscription.add( 
      this.stewardService.get('merchant-dashboard').subscribe((response) => {
        if (response.code === 200) {
          this.dashboardData = response.data;
          console.log('this is merchant dasboards data',this.dashboardData);

        //   for (let item of this.dashboardData) {
        //     this.allmerchantNames = item.merchant.accountName;
        //     console.log('>>>>>>>>>',item.dashboardData); // Will display contents of the object inside the array
        // }
          
        this.dashboardData.forEach((element, index, array) => {
          this.allmerchantNames.push(element);          
      });
           
        } else {
          this.notify.showWarning(response.message);
        }
      })
    );

  }

  onChange(dataindex) {
    
    this.finalDataToDisplay = [];
    this.finalDataToDisplay.push(this.dashboardData[dataindex].dashboardData);
   
    
    
  }


  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
