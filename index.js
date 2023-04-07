const express = require("express");
const exphbs = require("express-handlebars");
const Chart = require("chart.js");
const deals = require("./models/deals_history");
const dealModel = require("./models/deals");
const siteModel = require("./models/sites");
const app = express();
const sequelize = require("sequelize");
const moment = require("moment");
const { Op } = require("sequelize");
const dateFormat = require('handlebars-dateformat');


app.use(express.static('public'));
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    helpers: {
      dateFormat: dateFormat,
    },
  })
);

// Define route for home page
app.get("/", async (req, res) => {
  const startDate = new Date("2020-11-01");
  const endDate = new Date("2021-11-30");

  const result = await deals.findAll({
    attributes: [
      [sequelize.fn("date_trunc", "month", sequelize.col("date")), "month"],
      "site_id",
      [sequelize.fn("count", sequelize.col("id")), "count"],
    ],
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    group: ["month", "site_id"],
    raw: true,
    order: sequelize.literal("month ASC, site_id ASC"),
  });
  let newLabels = [];
  let newdataarray = [];
  let colors = [];
  for (let i = 0; i < result.length; i++) {
    const letters = '0123456789ABCDEF';
    let color = '#';
   
    const deal = await dealModel.findOne({
      where:{
        site_id:result[i].site_id
      },
      include: {
        model: siteModel,
      },
      raw: true,
    });
    result[i]["deal"]=deal;
    color ="#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    const date = moment(result[i].month );
    const monthAndYear = date.format("MMMM YYYY");
    newLabels.push(monthAndYear+"/" +deal['site.title']);
    result[i].month=monthAndYear;
    result[i]['siteTitle']=deal['site.title'];
    newdataarray.push(result[i].count);
    colors.push(color)
  }
  const data = {
    labels: newLabels,
    datasets: [
      {
        label: "deals",
        data: newdataarray,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: colors,
        tension: 0.1,
      },
    ],
  };

  
  options= {
    scales: {
      xAxes: [{
        display: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        display: true
      }]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x',
          speed: 10
        }
      }
    }
  }
  


if(result){
  const chartData = JSON.stringify(data);
  const chartOptions = JSON.stringify(options);
  res.render("main", { layout: "index", chartData, chartOptions, result });
}
 
});

const port = process.env.PORT
app.listen(port, function () {
  console.log("Server started on port 3000");
});
