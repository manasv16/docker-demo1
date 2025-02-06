import { AfterViewInit, Component } from '@angular/core';
declare const Plotly: any;
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
@Component({
  selector: 'app-app-sales-graph',
  templateUrl: './app-sales-graph.component.html',
  styleUrls: ['./app-sales-graph.component.scss']
})
export class AppSalesGraphComponent {
  constructor(private coindeskService: ApiService,private dialog: MatDialog) {}
   displayedColumns: string[] = [ 'name', 'email', 'mobile', 'actions'];
   dataSource = new MatTableDataSource<any>();
 
   title = 'dashboard-template';
   icon!: string;
   titles!: string;
   value!: number;
   bitcoinPrice:any=''
   headerCards:any[]=[]
   storedata:any
   layout = { responsive: true };
   ngAfterViewInit(): void {
     this.generateChart();
     this.generatePieChart();
     this.getBitcoinPrice()
 }
   generateChart() {
     // Multi stacked bar chart
     const trace1 = {
       x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
       y: [10, 15, 13, 17, 22, 25, 30, 35],
       name: 'Accepted Sets',
       type: 'bar',
       width: 0.3,
       marker: {
         color: 'rgb(163, 214, 92)'
       },
       textposition: 'auto',  // Position of text 
       hoverinfo: 'y',
     };
 
     const data = [trace1];
 
     const layout = {
       bargap: 0.2,
       xaxis: {
         showgrid: false,
         visible: true,
         fixedrange: false,
         tickmode: 'linear',
      
       },
       yaxis: {
         showgrid: false,
         fixedrange: true
       },
       yaxis2: {
         zeroline: false,
         title: 'MoM Percentage',
         titlefont: { color: 'rgb(148, 103, 189)' },
         tickfont: { color: 'rgb(148, 103, 189)' },
         overlaying: 'y',
         side: 'right',
         showgrid: false,
       },
       showlegend: true,
       legend: {
         orientation: 'h',  // Set the orientation to horizontal
         x: 0.3,            // Center the legend horizontally
         y: 1.8             // Place the legend slightly above the plot area
       },
     
       font: {
         size: 10
       }
     };
 
     const config = {
       displayModeBar: false,
       editable: false,
       scrollZoom: false
     };
 
     Plotly.newPlot('chart-container', data, layout, config);
   }
   generatePieChart() {
     var data = [{
       values: [16, 15, 12, 6, 5, 4, 42],
       labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
       domain: {column: 0},
       name: 'GHG Emissions',
       hoverinfo: 'label+percent+name',
       hole: .4,
       type: 'pie'
     }
   ];
     
     var layout = {
      
       annotations: [
         {
           font: {
             size: 20
           },
           showarrow: false,
           text: 'GHG',
           x: 0.17,
           y: 0.5
         },
       
       ],
       height: 400,
       width: 600,
       showlegend: false,
       grid: {rows: 1, columns: 2}
     };
     
     Plotly.newPlot('myDiv', data, layout);
     
   }
 
   getBitcoinPrice(): void {
     
     this.coindeskService.getBitcoinPrice().subscribe(
       (data) => {
         this.headerCards = [];
 this.storedata=data
         // Loop through the bpi object and create cards dynamically
         for (const currencyCode in this.storedata.bpi) {
           
           if (this.storedata.bpi.hasOwnProperty(currencyCode)) {
             
             const currency = this.storedata.bpi[currencyCode];
     
             // Push the card data into the headerCards array
             this.headerCards.push({
               code: currencyCode,
               symbol: currency.symbol,
               rate: currency.rate,
               description: currency.description,
             });
           }
         }
     
         console.log(this.headerCards);  // You can log to the console for testing
       },
       (error) => {
         console.error('Error fetching Bitcoin price', error);
       }
     );
   }
   dataSource1:any[]=[
 {
   created_at:'16-01-2025',
   user_name:'Neha',
   email:'neha@gmail.com',
   mobile :'9108614237'
 },
 {
   created_at:'16-01-2025',
   user_name:'Ravi',
   email:'ravi@gmail.com',
   mobile :'9108614237'
 },
 {
   created_at:'16-01-2025',
   user_name:'Shivani',
   email:'shivani@gmail.com',
   mobile :'9108614237'
 },
 {
   created_at:'16-01-2025',
   user_name:'Lata',
   email:'lata@gmail.com',
   mobile :'9108614237'
 }
   ]
   closeDialogModel: boolean = false
   updateStatus(data:any){
 
   }
  
   CreateDialog(){
     this.closeDialogModel = true
   }
   create(): void {
     const dialogRef = this.dialog.open(CreateDialogComponent, {
       disableClose: true,
       width: '400px',
       data: { user_name: '', email: '', mobile: '' },
     });
 
     dialogRef.afterClosed().subscribe((result) => {
       if (result) {
         this.dataSource1.push(result);
         this.dataSource1 = [...this.dataSource1]; // Refresh the table
       }
     });
   }
  }