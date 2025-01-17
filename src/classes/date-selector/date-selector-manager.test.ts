/**
 * @jest-environment jsdom
 */
import "../../../__mocks__/game";
import "../../../__mocks__/form-application";
import "../../../__mocks__/application";
import "../../../__mocks__/document-sheet";
import "../../../__mocks__/handlebars";
import "../../../__mocks__/event";
import "../../../__mocks__/crypto";
import "../../../__mocks__/dialog";
import "../../../__mocks__/hooks";
import "../../../__mocks__/chat-message";

import DateSelectorManager from "./date-selector-manager";
import {DateSelector} from "./index";
import Calendar from "../calendar";
import {CalManager, updateCalManager} from "../index";
import CalendarManager from "../calendar/calendar-manager";


describe('Date Selector Manager Class Tests', () => {
    let tCal: Calendar;
    let ds: DateSelector

    beforeEach(()=>{
        updateCalManager(new CalendarManager());
        tCal = new Calendar('','');
        jest.spyOn(CalManager, 'getActiveCalendar').mockImplementation(() => {return tCal;});
        DateSelectorManager.Selectors = {};
        ds = DateSelectorManager.GetSelector('test', {showDateSelector: true, showTimeSelector: true});
    });

    test('Get Selector', () => {
        let newDs = DateSelectorManager.GetSelector('test2', {
            showDateSelector: true,
            showTimeSelector: true,
            allowDateRangeSelection: true,
            onDateSelect: () => {},
            timeDelimiter: '/',
            showCalendarYear: false,
            timeSelected: false,
            allowTimeRangeSelection: true,
            selectedStartDate: {year: 0, month: 1, day: 1, hour: 0, minute: 0, seconds: 0},
            selectedEndDate: {year: 0, month: 1, day: 1, hour: 0, minute: 0, seconds: 0}
        });
        expect(newDs.id).toBe('test2');
        expect(newDs.allowDateRangeSelection).toBe(true);
        expect(newDs.onDateSelect ).not.toBeNull();
        expect(Object.keys(DateSelectorManager.Selectors).length).toBe(2);

        newDs = DateSelectorManager.GetSelector('test', {
            showDateSelector: true,
            showTimeSelector: true,
            selectedStartDate: {year: 1, month: 1, day: 1, hour: 0, minute: 0, seconds: 0},
            selectedEndDate: {year: 1, month: 1, day: 1, hour: 0, minute: 0, seconds: 0}
        });
        expect(newDs).toStrictEqual(ds);
    });

    test('Remove Selector', () => {
        expect(Object.keys(DateSelectorManager.Selectors).length).toBe(1);
        DateSelectorManager.RemoveSelector('no');
        expect(Object.keys(DateSelectorManager.Selectors).length).toBe(1);
        DateSelectorManager.RemoveSelector('test');
        expect(Object.keys(DateSelectorManager.Selectors).length).toBe(0);
    });

    test('Activate Selector', () => {
        jest.spyOn(ds, 'activateListeners').mockImplementation(() => {});
        DateSelectorManager.ActivateSelector('no');
        expect(ds.activateListeners).not.toHaveBeenCalled();
        DateSelectorManager.ActivateSelector('test');
        expect(ds.activateListeners).toHaveBeenCalledTimes(1);
    });
});