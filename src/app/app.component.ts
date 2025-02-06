import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from './api.service';
declare const Plotly: any;
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { HttpClient } from '@angular/common/http';
import { audit, auditTime, bufferCount, bufferWhen, combineLatestAll, count, debounce, defaultIfEmpty, delay, delayWhen, dematerialize, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt, ErrorNotification, first, from, fromEvent, interval, map, mergeMap, NextNotification, Observable, of, range, scan, switchMap, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private coindeskService: ApiService,private dialog: MatDialog, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.loadInitialData()
  }
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
  datacheck:any = [
    {
      id: 1,
      name: "John",
      children: [
        { id: 1.1, name: "Jane" },
        null,
        { id: 1.2, name: "Jack" }
      ]
    },
    {
      id: 2,
      name: "Doe",
      children: [
        null,
        { id: 2.1, name: "Sam" }
      ]
    },
    null
  ];
  nestedArray=[
    {
      "locationId": 1,
      "name": "Paris",
      "country": "France",
      "tours": [
        {
          "tourId": 1,
          "tourName": "Eiffel Tower Tour",
          "duration": "3 hours",
          "price": 50,
          "reviews": [
            {
              "reviewId": 1,
              "customerName": "Alice",
              "rating": 1,
              "comment": "Amazing experience, the view from the top is breathtaking!"
            }
          ]
        },
        {
          "tourId": 2,
          "tourName": "Louvre Museum Tour",
          "duration": "2 hours",
          "price": 40,
          "reviews": [
            {
              "reviewId": 2,
              "customerName": "Bob",
              "rating": 4,
              "comment": "Great tour, but the museum is very crowded."
            }
          ]
        }
      ]
    },
    {
      "locationId": 2,
      "name": "New York City",
      "country": "USA",
      "tours": [
        {
          "tourId": 3,
          "tourName": "Statue of Liberty Tour",
          "duration": "4 hours",
          "price": 60,
          "reviews": [
            {
              "reviewId": 3,
              "customerName": "Charlie",
              "rating": 5,
              "comment": "A must-see for anyone visiting New York!"
            }
          ]
        }
      ]
    }
  ]
  
  withoutNull:any[]=[]
  notNullVal:any[]=[]
  eachClassnames:any
  eachDrugNmae:any
  drugnamesArray:any
  emptyData:any[]=[]
 
   companyData = [
    {
      departmentId: 1,
      departmentName: "Engineering",
      teams: [
        {
          teamId: 1,
          teamName: "Frontend",
          members: [
            { memberId: 1, name: "Alice", skills: ["React", "JavaScript"], experience: 4 },
            { memberId: 2, name: "Bob", skills: ["Vue", "JavaScript"], experience: 2 },
          ],
          projects: [
            {
              projectId: 1,
              projectName: "Website Redesign",
              progress: 80,
              tasks: [
                { taskId: 1, title: "Build UI Components", status: "completed" },
                { taskId: 2, title: "Integrate API", status: "in-progress" },
              ],
            },
          ],
        },
        {
          teamId: 2,
          teamName: "Backend",
          members: [
            { memberId: 3, name: "Charlie", skills: ["Node.js", "Python"], experience: 5 },
            { memberId: 4, name: "David", skills: ["Java", "Spring"], experience: 3 },
          ],
          projects: [
            {
              projectId: 2,
              projectName: "API Development",
              progress: 60,
              tasks: [
                { taskId: 3, title: "Design Database", status: "completed" },
                { taskId: 4, title: "Develop Endpoints", status: "in-progress" },
              ],
            },
          ],
        },
      ],
    },
    {
      departmentId: 2,
      departmentName: "Marketing",
      teams: [
        {
          teamId: 3,
          teamName: "Content",
          members: [
            { memberId: 5, name: "Eve", skills: ["SEO", "Copywriting"], experience: 6 },
            { memberId: 6, name: "Frank", skills: ["Content Strategy", "Copywriting"], experience: 3 },
          ],
          projects: [
            {
              projectId: 3,
              projectName: "Brand Awareness Campaign",
              progress: 90,
              tasks: [
                { taskId: 5, title: "Create Ads", status: "completed" },
                { taskId: 6, title: "Analyze Data", status: "in-progress" },
              ],
            },
          ],
        },
      ],
    },
  ];
  
  ngOnInit(){
    
    // const observable = new Observable((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
      
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });
     
    //----------------execute the observale--------------------
    // console.log('just before subscribe');
    // observable.subscribe({
    //   next(x) {
    //     console.log('got value ' + x);
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   complete() {
    //     console.log('done');
    //   },
    // });
    // console.log('just after subscribe');

    //----------------try catch error appers when there is any error
    // const observable = new Observable(function subscribe(subscriber) {
    //   try {
    //     subscriber.next(1);
    //     subscriber.next(2);
    //     subscriber.next(3);
    //     subscriber.complete();
    //   } catch (err) {
    //     subscriber.error(err); // delivers an error if it caught one
    //   }
    // });
    // const subscription = observable.subscribe((x) => console.log(x));


    //-----------------------unsubcribe the observale----------------------
    // function subscribe(subscriber:any) {
    //   const intervalId = setInterval(() => {
    //     subscriber.next('hi');
    //   }, 1000);
     
    //   return function unsubscribe() {
    //     clearInterval(intervalId);
    //   };
    // }
     
    // const unsubscribe = subscribe({ next: (x:any) => console.log(x) });
    //---------------------pipable operators--------------------
    // it will multiply the values
// of(1, 2, 3)
// .pipe(map((x) => x * x))
// .subscribe((v) => console.log(`value: ${v}`));

// it will print the 1st value
// of(1, 2, 3)
//   .pipe(first())
//   .subscribe((v) => console.log(`value: ${v}`));

  //--------------------Observale operators------------------
  //-------------------audit-----------------
  // const clicks = fromEvent(document, 'click');
  // const result = clicks.pipe(audit(ev => interval(1000)));
  // result.subscribe(x => console.log(x));
  //------------------------auditTime----------------
//   const clicks = fromEvent(document, 'click');
// const result = clicks.pipe(auditTime(1000));
// result.subscribe(x => console.log(x));
//-------------------buffer-count---------------
// const clicks = fromEvent(document, 'click');
// const buffered = clicks.pipe(bufferCount(2, 1));
// buffered.subscribe(x => console.log(x));
// //--------------bufferwhen--------------
// const clicks = fromEvent(document, 'click');
// const buffered = clicks.pipe(
//   bufferWhen(() => interval(10 + Math.random() * 40))
// );
// buffered.subscribe(x => console.log(2));
//-------------------combine-all-------------------

// const clicks = fromEvent(document, 'click');
// const higherOrder = clicks.pipe(
//   map(() => interval(Math.random() * 2000).pipe(take(3))),
//   take(2)
// );
// const result = higherOrder.pipe(combineLatestAll());

// result.subscribe(x => console.log(x));
//-------------------count---------------------
// const seconds = interval(1000);
// const clicks = fromEvent(document, 'click');
// const secondsBeforeClick = seconds.pipe(takeUntil(clicks));
// const result = secondsBeforeClick.pipe(count());
// result.subscribe(x => console.log(x));
//------------------------example of count--------------------
// const numbers = range(1, 7);
// const result = numbers.pipe(count(i => i % 2 === 1));
// result.subscribe(x => console.log(x));
//-----------------------debounce--------------------

// const clicks = fromEvent(document, 'click');
// const result = clicks.pipe(
//   scan(i => ++i, 1),
//   debounce(i => interval(200 * i))
// );
// result.subscribe(x => console.log(x));
//--------------default-empty--------------------------
// const clicks = fromEvent(document, 'click');
// const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
// const result = clicksBeforeFive.pipe(defaultIfEmpty('no clicks'));
// result.subscribe(x => console.log(x));
//----------------------------delay---------------
// const clicks = fromEvent(document, 'click');
// const date = new Date('March 15, 2050 12:00:00'); 
// const delayedClicks = clicks.pipe(delay(date));
// delayedClicks.subscribe(x => console.log(x));
//------------------delay-when--------------------------
// const clicks = fromEvent(document, 'click');
// const delayedClicks = clicks.pipe(
//   delayWhen(() => interval(Math.random() * 5000))
// );
// delayedClicks.subscribe(x => console.log(x));
//------------------------dematerialized------------------
// const notifA: NextNotification<string> = { kind: 'N', value: 'A' };
// const notifB: NextNotification<string> = { kind: 'N', value: 'B' };
// const notifE: ErrorNotification = { kind: 'E', error: new TypeError('x.toUpperCase is not a function') };
 
// const materialized = of(notifA, notifB, notifE);
 
// const upperCase = materialized.pipe(dematerialize());
// upperCase.subscribe({
//   next: x => console.log(x),
//   error: e => console.error(e)
// });
//-------------distinct------------
// of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
//   .pipe(distinct())
//   .subscribe(x => console.log(x));
//------------------------------distinct-unctil-chnaged--------------------------------

// of(1,1,1,1,1,1,1,1, 1, 1, 4,4,4,4,4, 5,5,5, 2, 2, 2, 1, 3, 3)
//   .pipe(distinctUntilChanged())
//   .subscribe(console.log);
//---------------------------diticnt until key changed---------------------------
// of(
//   { age: 4, name: 'Foo' },
//   { age: 7, name: 'Bar' },
//   { age: 5, name: 'Foo' },
//   { age: 6, name: 'Foo' }
// ).pipe(
//   distinctUntilKeyChanged('name')
// )
// .subscribe(x => console.log(x));
//-----------element-at--------------------

// const clicks = fromEvent(document, 'click');
// const result = clicks.pipe(elementAt(2));
// result.subscribe(x => console.log(x));
const companyObservable = from(this.companyData);

companyObservable.subscribe({
  next: (department) => {
    console.log(`Department: ${department.departmentName}`);
    department.teams.forEach((team) => {
      console.log(`  Team: ${team.teamName}`);
      team.projects.forEach((project) => {
        console.log(`    Project: ${project.projectName} (Progress: ${project.progress}%)`);
      });
    });
  },
  complete: () => {
    console.log("All departments processed.");
  },
  error: (err) => {
    console.error("Error:", err);
  },
});
processCompanyData(this.companyData);
async function processCompanyData(data:any) {
  for (const department of data) {
    console.log(`Department: ${department.departmentName}`);
    await processTeams(department.teams); 
  }
  console.log("All departments processed.");
}

async function processTeams(teams:any) {
  for (const team of teams) {
    console.log(`Team: ${team.teamName}`);
    await processProjects(team.projects); 
  }
}

async function processProjects(projects:any) {
  for (const project of projects) {
    console.log(`Project: ${project.projectName} (Progress: ${project.progress}%)`);
    await processTasks(project.tasks); 
  }
}

async function processTasks(tasks:any) {
  for (const task of tasks) {
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        console.log(`Task: ${task.title} (Status: ${task.status})`);
        resolve();
      }, 500) 
    );
  }
}
  }

  
  message = 'ABC';
  simulateAsyncOperation() {
    setTimeout(() => {
      this.message = 'Async operation complete';
     this.cdr.detectChanges()
     
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.nestedArray.map((item: any) => {
      item.tours.map((tourRate: any) => {
        tourRate.reviews.map((items: any) => {
          if (items.rating >= 5) {
            if (items.rating === 5 && items.comment.length >= 10) {
              items.comment = items.comment.substring(0, 10) + '...';
            }
            const StarRateObject = {
              ...item, 
              ...tourRate, 
              reviews: [items], 
            };
    
            // console.log(StarRateObject);
          }
        });
      });
    });

// //// merge map
//     from([1, 2, 3]).pipe(
//       mergeMap(val => of(val * 2).pipe(delay(1000))) // Inner observable
//     ).subscribe(console.log); 
// ////switch map
// const inputValues = from([1, 2, 3, 4, 5]); // Example numbers emitted over time

// inputValues.pipe(
//   switchMap(value => 
//     of(`Processed value: ${value}`).pipe(delay(1000)) // Simulate delay for each value
//   )
// ).subscribe(console.log);



    
//     this.companyData.map((item:any)=>{
//       item.teams.map((item1:any)=>{
//         const experiencedMembers = item1.members.filter((member:any) => member.experience < 4);
// let wholeArray={
//   ...experiencedMembers
// }
// console.log(wholeArray)
//       })
//     })
    
    










this.withoutNull = this.datacheck
  .filter((item: any) => item !== null) 
  .map((item: any) => {
    if (item.children) {
      item.children = item.children.filter((child: any) => child !== null); 
    }
    return {
      id: item.id,
      name: item.name,
      children: item.children
    };
  });

// console.log(this.withoutNull);
    
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
    
        // console.log(this.headerCards);  You can log to the console for testing
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
  displayedData: any[] = [];
  pageSize = 2; // Number of items to load per scroll
  currentPage = 0;
  noMoreData:boolean=false
  isLoading = false;
  loadData() {
    if (this.isLoading || this.noMoreData) {
      return; // Prevent multiple triggers while loading
    }

    this.isLoading = true; // Set loading state to true

    // Simulate a 2-second delay
    setTimeout(() => {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const newData = this.dataSource1.slice(startIndex, endIndex);

      if (newData.length > 0) {
        this.displayedData = [...this.displayedData, ...newData];
        this.currentPage++;
      } else {
        this.noMoreData = true; // Indicate no more data to load
      }

      this.isLoading = false; // Reset loading state
    }, 2000); // 2-second delay
  }
  loadInitialData() {
    // Load only the first two rows on page load
    this.displayedData = this.dataSource1.slice(0, this.pageSize);
    this.currentPage++;
  }
  onScroll(event: any) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadData(); 
    }
  }

  //upload pdf
  selectedFile: any;
  uploading: boolean = false;
  uploadSuccess: boolean = false;


  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    this.uploading = true;
    const reader = new FileReader();
   
    reader.readAsDataURL(this.selectedFile);
   
    reader.onload = () => {
      const base64File = reader.result as string;
      // console.log(base64File)
      const payload = {
        fileName: this.selectedFile.name,
        fileContent: base64File,
      };
      // Replace this with your backend API endpoint
      this.http.post('http://your-backend-api-endpoint/upload', payload)
        .subscribe({
          next: () => {
            this.uploading = false;
            this.uploadSuccess = true;
          },
          error: () => {
            this.uploading = false;
          }
        });
    };
  }
  //chunk file upload
  chunkSize = 1024 * 1024; // 1 MB


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadFileInChunks(file);
    }
  }

  async uploadFileInChunks(file: File): Promise<void> {
    const totalChunks = Math.ceil(file.size / this.chunkSize);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * this.chunkSize;
      const end = Math.min(start + this.chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk, file.name);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());

      try {
        await this.http.post('YOUR_API_ENDPOINT', formData).toPromise();
        //  console.log(`Chunk ${chunkIndex + 1}/${totalChunks} uploaded successfully.`);
      } catch (error) {
        console.error(`Failed to upload chunk ${chunkIndex + 1}:`, error);
        break; // Stop further uploads if one chunk fails
      }
    }
  }
 


}

