import { faker } from '@faker-js/faker';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { useMyContext } from 'src/sections/myProvider';
import { FaBeer } from 'react-icons/fa'; // Importing FontAwesome icon
import PopupForm from './pop_up_form';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
import { SimpleLinearRegression } from 'ml-regression-simple-linear';
import { object } from 'prop-types';

// ----------------------------------------------------------------------


export default function AppView() {
  const[loading,setloading]=useState(1);

  const {data, setData} = useMyContext();
  const [spend_status,setspendstatus] = useState(0);
  const [x,setx] = useState([]);
  const [y,sety] = useState([]);
  
  const stock_data={"BLK":[844,845,825,837,857,870,872],
    "AAPL":[225,226,224,224,217,219,218],
    "GOOGL":[181,178,180,182,176,171,168],
    "MSFT":[445,434,440,444,441,427,421],
    "NFLX":[647,639,635,648,639,636,641],
    "META":[477,483,487,478,462,460,469],

  }

  const slopes=[]
  const stock_names = {
    "BLK": "Blackrock",
    "AAPL": "Apple",
    "GOOGL": "Alphabet",
    "MSFT": "Microsoft",
    "NFLX": "Netflix",
    "META": "Facebook"
  }
  const [to_be_shown,set_shown]=useState(["BLK"]);
  

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(()=>{

    data.expenditure_list.map((obj)=>{
      if(obj.amount<0){
        let d=new Date(obj.date);

        let tempx=x;
        tempx.push(d.getDate())
        
        setx(tempx)
        let tempy=y;
        tempy.push(-obj.amount/1000);
        sety(tempy);

      }
    })
    const regression = new SimpleLinearRegression(x, y);
    if(regression.slope>0.2){
      setspendstatus(1);
    }
    else if(regression.slope<-0.2){
      setspendstatus(-1);
    }
    else{
      setspendstatus(0);
    }
    console.log(regression.slope);
  },[])

    Object.entries(stock_data).forEach(([key, value]) => {
      const regression_model=new SimpleLinearRegression([1,2,3,4,5,6,7],value);
     slopes.push({"key": key, "value": regression_model.slope});
    });

    slopes.sort((a, b) => a.value - b.value);

console.log(slopes);
  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const check_handler = (title) => {
    const getKeyByValue = (object, value) => {
      return Object.keys(object).find(key => object[key] === value);
    };
    
    const key = getKeyByValue(stock_names, title);
    let new_arr;
    if (to_be_shown.includes(key)) {
      new_arr = to_be_shown.filter(k => k !== key);
    } else {
      new_arr = [...to_be_shown, key];
    }
    set_shown(new_arr);
  };

  const get_total=()=>{

    const map=new Map();
    data.expenditure_list.map((obj)=>{
      if(obj.is_expense==true){
        if(!map.has(obj.catagory)){
          map.set(obj.catagory,-obj.amount);
        }
        else{
          map.set(obj.catagory,map.get(obj.catagory)-obj.amount)
        }
      }
    })
    const array = Array.from(map, ([key, value]) => ({
      label: key,
      value: value
    }));
    return array;
  }
  
  const get_total_expenses = () => {
    let sum = 0;
    data.expenditure_list.map((obj)=>{
      if(obj.is_expense==true){
        sum -= obj.amount;
      }
    })
    return sum;
  }
  return (
    
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back {data.name}👋
      </Typography>

      <Grid container spacing={3}>
        

       
        
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Current Balance"
            total={data.current_funds}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Expenditure"
            total={get_total_expenses()}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={spend_status == 1 ? "Increasing Expenses" : spend_status == 0 ? "Neutral Expenses" : "Decreasing Expenses"}
            // total={}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <div onClick={handleOpenPopup}> <PopupForm isVisible={isPopupVisible} onClose={handleClosePopup}  /> <AppWidgetSummary title="Add transaction" 
            
            color="success"
            icon={<img alt="icon" src="/assets/icons/add_transaction.png" />} />
          </div>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Expense Comparison"
            // subheader="(+43%) than last year"
            chart={{
              series: get_total()
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Expense breakdown"
            chart={{
              series: get_total()
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Stock Fluctuation"
            subheader="Over the past week"
            chart={{
              labels: [
                '07/25/2003',
                '07/26/2003',
                '07/27/2003',
                '07/28/2003',
                '07/29/2003',
                '07/30/2003',
                '07/31/2003',
              ],

              series: to_be_shown.map(key => (
                {
                  "name": key,
                  "type": 'area',
                  "fill": 'gradient',
                  "data": stock_data[key]
                }
              ))
            }}
          />
        </Grid>

            
        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            
            // key={key}
            title=" "
            subheader=" "
            list={[...Array(6)].map((_, index) => ({
              id: faker.string.uuid(),
              title: Object.keys(stock_data).map(key => stock_names[key] || key)[index],
              checkHandler: (key) => {check_handler(key)},
              type: `order${index + 1}`,
            }))}
          />
        </Grid>

        

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Radar Chart"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            // list={[...Array(5)].map((_, index) => ({
            //   id: faker.string.uuid(),
            //   title: faker.person.jobTitle(),
            //   description: faker.commerce.productDescription(),
            //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
            //   postedAt: faker.date.recent(),
            // }))}
             list ={
              [{
                  id: faker.string.uuid(),
              title: 'First interest rate cut in 4 years likely on the horizon',
              description: 'With the end of their two-year fight against inflation in sight, Federal Reserve officials are likely Wednesday to set the stage for the first cut to their key interest rate in four years, a major shift in policy that could eventually lower borrowing costs for U.S. consumers and businesses.',
              image: `/assets/images/covers/cover_1.jpg`,
              postedAt: faker.date.recent(),
              },{
                              id: faker.string.uuid(),
              title: 'Euro-Area Growth Beats Forecasts',
              description: 'The euro-area economy grew more than expected in the second quarter as resilient expansion in key countries allowed the region to shrug off Germany’s surprise contraction.',
              image: `/assets/images/covers/cover_2.jpg`,
              postedAt: faker.date.recent(),
              },{
                              id: faker.string.uuid(),
              title: 'Kamala Harris Wipes Out Trump’s Swing-State...',
              description: 'Kamala Harris has wiped out Donald Trump’s lead across seven battleground states, as the vice president rides a wave of enthusiasm among young, Black and Hispanic voters, according to the latest Bloomberg News/Morning Consult ',
              image: `/assets/images/covers/cover_3.jpg`,
              postedAt: faker.date.recent(),
              }]
             }
          />
        </Grid>

        

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Our Top Picks"
            list = {slopes.slice(0,4).map(obj => ({
              name: obj.key,
              value: obj.value
            }
            ))}

          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
