angular.module('bkApp')

.controller('mainCtrl', function ($scope, $location) {

  //Init
  var chartOptions = {
    responsive : true,
    maintainAspectRatio: true,
    scaleGridLineColor : 'rgba(255,255,255,1)',
    scaleLineColor : "rgba(255,255,255,1)",
    scaleFontColor : "rgba(255,255,255,1)",
    pointHitDetectionRadius : 20,
    maintainAspectRatio : false,
    tooltipEvents: ["mousemove", "touchstart"]
  }

  var charts = {
    1 : {},
    2 : {},
    3 : {}
  }

  var customLabels = {
    2003 : "Started Bachelor's in<br> Aerospace Engineering",
    2006 : '16-month Co-op at<br> Pratt and Whitney Canada',
    2008 : 'Started Graduate Studies at the<br> Institute for Integrated Energy System<br>(University of Victoria)',
    2011 : 'Started with Arborus Consulting (Building Energy Modelling)',
    2014 : "Started with Natural Resources Canada's<br>Office of Energy Efficiency (Statistical Modelling)",
    2016 : 'Started with Posterity Group (Utility Program Design)',
    2018 : 'Start with WattTime!!!',
    2020 : 'Achieve Amory Lovins-<br>level energy efficiency sorcery'
  }

  var customLabels2 = {
    'Data Analytics' : 'Python<br>R<br>SAS<br>Excel/VBA<br>Selenium<br>Basic SciKit-Learn<br>Basic Natural Language Toolkit<br>Basic MongoDB',
    'Visualization' : 'Tableau<br>matplotlib<br>Plotly<br>Bokeh<br>Excel<br>Basic D3.js',
    'Network Analysis' : 'Optimal Power Flow (Linear and Mixed-Integer programming)<br>Long Term Network Planning - Natural Gas Peak Demand',
    'Building Modelling' : 'eQuest, DOE + some Open Studio<br>LEED and Code Compliance Modelling<br>Integrated Design Charrettes',
    'Energy Data Collection' : 'Statistically representative surveys<br>Municipal building energy benchmarking programs<br>ENERGY STAR Building Benchmarking Score development (with NRCan)'
  }

  //Carosel
  jQuery('.carosel').slick({
    accessibility : true,
    arrows : true,
    appendArrows: jQuery(".append"),
    dots: true,
    appendDots: jQuery(".append"),
    infinite: false,
    speed: 500,
    centerPadding: '0px'
  });

  $('.carosel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    jQuery('#chartjs-tooltip').css('opacity','0');
  });

  $('.carosel').on('afterChange', function(event, slick, currentSlide){
    if([1,2,3].indexOf(currentSlide) >= 0) {
      initSlide(currentSlide);
    }
  });


  // Draw chart on first viewing by user
  var initSlide = function(s) {
    if(!charts[s].ctx) {
      charts[s].ctx = jQuery("#chart"+s).get(0).getContext("2d");
      charts[s].chartOptions = angular.copy(chartOptions);
      
      switch(s) {
        
        // Line Chart
        case 1 :
          data = {
            labels: [2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            datasets: [
              {
                label: "career",
                fillColor: "rgba(255,255,255,0.5)",
		            strokeColor: "rgba(255,255,255,1)",
                highlightFill: "rgba(255,255,255,1)",
                highlightStroke: "rgba(255,255,255,1)",
                data: [0, null, null, 15, null, 20, null, null, 40, null, null, 60, null, 90, null, 130,null,200],
                tips: [0, null, null, 15, null, 20, null, null, 40, null, null, 60, null, 90, null, 130,null,200]
              }
            ]
          };
          charts[s].chartOptions.bezierCurve = true;
          charts[s].chartOptions.scaleOverride = true;
          charts[s].chartOptions.scaleSteps = 10;
          charts[s].chartOptions.scaleStepWidth = 20;
          charts[s].chartOptions.scaleStartValue = 0;
          charts[s].chartOptions.pointDotRadius = 5;
          charts[s].chartOptions.scaleShowGridLines = true;
          
          // Custom tooltip
          charts[s].chartOptions.customTooltips = function(tooltip){
            var tooltipEl = jQuery('#chartjs-tooltip');

            if (!tooltip) {
              tooltipEl.css({ opacity: 0 });
              return;
            }
            else if (!customLabels[tooltip.text.substr(0,4)]) {
              tooltipEl.css({ opacity: 0 });
              return;
            }

            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);
            
            tooltipEl.html('<div class="chartjs-tooltip-section"><span class="chartjs-tooltip-value">' + customLabels[tooltip.text.substr(0,4)] + '</span></div>');

            tooltipEl.css({
                opacity: 1,
                left: (jQuery('.carosel')[0].offsetLeft + tooltip.x + 5) + 'px',
                top: tooltip.chart.canvas.offsetTop + 50 + tooltip.y + 'px',
                fontFamily: tooltip.fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip.fontStyle,
            });
            
          }
          
          charts[s].myChart = new Chart(charts[s].ctx).Line(data, charts[s].chartOptions);
          break;
        
        

        // Radar Chart
        case 2:
          data = {
            labels: ["Data Analytics","Visualization","Network Analysis","Building Modelling","Energy Data Collection"],
            datasets: [
              {
                label: "My First dataset",
                fillColor: "rgba(255,255,255,0.2)",
                strokeColor: "rgba(255,255,255,1)",
                pointColor: "rgba(255,255,255,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(255,255,255,1)",
                data: [5, 4, 3.5, 3, 5]
              }
            ] 
          };
          charts[s].chartOptions.pointLabelFontSize = 16;
          charts[s].chartOptions.pointLabelFontColor = '#FFFFFF';
          charts[s].chartOptions.maintainAspectRatio = false;
          
          // Custom tooltip
          charts[s].chartOptions.customTooltips = function(tooltip){
            var tooltipEl = jQuery('#chartjs-tooltip');

            if (!tooltip) {
              tooltipEl.css({ opacity: 0 });
              return;
            }

            else if (!customLabels2[tooltip.text.substr(0,tooltip.text.indexOf(':'))]) {
              tooltipEl.css({ opacity: 0 });
              return;
            }

            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);
            
            tooltipEl.html('<div class="chartjs-tooltip-section"><span class="chartjs-tooltip-value">' + customLabels2[tooltip.text.substr(0,tooltip.text.indexOf(':'))] + '</span></div>');

            tooltipEl.css({
                opacity: 1,
                left: (jQuery('.carosel')[0].offsetLeft + tooltip.x + 5) + 'px',
                top: tooltip.chart.canvas.offsetTop + 50 + tooltip.y + 'px',
                fontFamily: tooltip.fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip.fontStyle,
            });
            
          }

          charts[s].myChart = new Chart(charts[s].ctx).Radar(data, charts[s].chartOptions);
          break;

        // Doughnut Chart
        case 3:
          data = [
            {
              value: 50,
              color:"rgba(220,237,200,0.5)",
              highlight: "rgba(220,237,200,1.0)",
              label: "Hanging out with my wife and daughter"
            },
            {
              value: 25,
              color:"rgba(174,213,129,0.5)",
              highlight: "rgba(174,213,129,1.0)",
              label: "Marathon canoe racing"
            },
            {
              value: 15,
              color:"rgba(139,195,74,0.5)",
              highlight: "rgba(139,195,74,1.0)",
              label: "Weightlifting"
            },
            {
              value: 10,
              color:"rgba(104,159,56,0.5)",
              highlight: "rgba(104,159,56,1.0)",
              label: "Working on my 1982 Honda Hobbit moped"
            }
          ]

          charts[s].myChart = new Chart(charts[s].ctx).Doughnut(data, charts[s].chartOptions);
          break;

      }
    }

  }

});
