import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  index = 0;
  isDateRequired = false;
  inputDate = null;
  month = null;
  calFocus = null;
  isActive = null;
  isRequired = null;
  errorMessage = null;
  datesOfInterest = [];
  footerData = [];
  date = moment().format('MM/DD/YYYY');

  daysInWeek = [
    {
      day: "Su",
      title: "Sunday"
    },
    {
      day: "Mo",
      title: "Monday"
    },
    {
      day: "Tu",
      title: "Tuesday"
    },
    {
      day: "We",
      title: "Wednesday"
    },
    {
      day: "Th",
      title: "Thursday"
    },
    {
      day: "Fr",
      title: "Friday"
    },
    {
      day: "Sa",
      title: "Saturday"
    }
  ];
  _removeTime(date) {
    return date.hour(0).minute(0).second(0).millisecond(0);
  }






  _buildWeek(ctrl, date, month) {
    var today = new Date();
    var days = [];

    for (var i = 0; i < 7; i++) {
      days.push({
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(today, 'day'),
        date: date
      });

      date = date.clone();
      date.add(1, 'd');
    }

    return days;
  }

  _buildMonth(ctrl, start, month) {
    var done = false;
    var date = start.clone();
    var monthIndex = date.month();
    var count = 0;

    ctrl.weeks = [];

    while (!done) {
      ctrl.weeks.push({days: this._buildWeek(ctrl, date.clone(), month)});
      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  constructor(private router:Router) {

  }
  ngOnInit(){
    this.inputDate = moment(moment(), "MM/DD/YYYY");
    this.month = this._removeTime(this.inputDate || moment());
    this.calFocus = false;
    this.isActive = false;
    // Create calendar for current month
    var start = this.month.clone();
    start.date(1);
    this._removeTime(start.day(0));
    this._buildMonth(this, start, this.month);
    if (this.isRequired) {
      this.isDateRequired = this.isRequired;
    }

  }

  getDayCls = function (day) {
    return day.isCurrentMonth ? (day.isToday ? 'is-today' : (moment(day.date._d).format('L') === this.date ? 'is-selected-date' : 'is-in-month')) : 'is-not-in-month';
  };

  next() {
    this.datesOfInterest = [];
    this.footerData = [];
    var next = this.month.clone();
    this._removeTime(next.month(next.month() + 1).date(1));
    next.day(0);
    this.month.month(this.month.month() + 1);

    this._buildMonth(this, next, this.month);
  };

  prev() {
    this.datesOfInterest = [];
    this.footerData = [];
    var prev = this.month.clone();
    this._removeTime(prev.month(prev.month() - 1).date(1));
    prev.day(0);
    this.month.month(this.month.month() - 1);

    this._buildMonth(this, prev, this.month);
  };

  onOffClick_event() {
    this.isActive = this.isActive ? this.calFocus ? true : false : false;
    if (!this.isActive) {
      if (this.errorMessage) {
        //ctrl.$onInit();
        //this.date = moment(moment(), "MM/DD/YYYY").format('MM/DD/YYYY');
        //this.onUpdate({data: ctrl.date});
      }
      this.errorMessage = false;
    }

  };

  clicked = function () {
    this.isActive = false;
  };

  showCurrentDate(day) {
    this.date = moment(day, "MM/DD/YYYY").format('MM/DD/YYYY');
    this.inputDate = moment(this.date, "MM/DD/YYYY");
    this.month = this._removeTime(this.inputDate || moment());
    // Create calendar for current month
    var start = this.month.clone();
    start.date(1);
    this._removeTime(start.day(0));
    this._buildMonth(this, start, this.month);
  };

  /*goToNextMonth(e) {
    var startDate = moment([this.month.year(), this.month.month()]);
    var endDate = moment(startDate).endOf('month');
    if (e.which === 9) {
      if (endDate.date() === +e.currentTarget.innerText) {
        angular.element('button#prev').focus();
      }
    } else if (e.keyCode === 16) {
      var arr = angular.element('div.tn-datepicker-row').find('div.tn-datepicker-day');
      arr.filter(function (ele, index) {
        if (angular.element(arr[ele]).find('span')[0].innerHTML == (endDate.date())) {
          angular.element(angular.element(arr[ele - 1]).find('button')).focus();
          return;
        }
      });
    }
  };*/


  onDayClick(day) {
    this.errorMessage = false;
    this.isActive = false;
    this.date = moment(day.date, "MM/DD/YYYY").format('MM/DD/YYYY');
    /*if (ctrl.disableFutureDates && day.date._d > new Date()) {
      ctrl.errorMessage = true;
      ctrl.errorMessageString = "Date cannot be in the future";
    }
    else if (ctrl.disablePastDates && day.date._d < new Date()) {
      ctrl.errorMessage = true;
      ctrl.errorMessageString = "Date cannot be in the past";
    }
    else if (ctrl.maxDate && day.date._d > new Date(ctrl.maxDate)) {
      ctrl.errorMessage = true;
      ctrl.errorMessageString = "Date cannot be more than 60 days in the future";
    }
    else if (ctrl.minDate && day.date._d < new Date(ctrl.minDate)) {
      ctrl.errorMessage = true;
      ctrl.errorMessageString = ctrl.minDateMsg ? ctrl.minDateMsg : "Date cannot be more than 30 days in the past";
    }
    else {
      ctrl.date = moment(day.date._d, "MM/DD/YYYY").format('MM/DD/YYYY');
      ctrl.isActive = false;
      ctrl.onUpdate({data: ctrl.date});
      angular.element('div#dateSelect').focus();
    }*/
  };

  login() {
    this.router.navigate(['main'])
  }
}
