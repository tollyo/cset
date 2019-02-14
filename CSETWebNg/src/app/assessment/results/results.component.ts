////////////////////////////////
//
//   Copyright 2018 Battelle Energy Alliance, LLC
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all
//  copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//  SOFTWARE.
//
////////////////////////////////
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '../../../../node_modules/@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  // tslint:disable-next-line:use-host-property-decorator
  host: {class: 'd-flex flex-column flex-11a'}
})
export class ResultsComponent implements OnInit {
  constructor(
    private assessSvc: AssessmentService,
    private navSvc: NavigationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.populateTree();
  }

  ngOnInit() {
    this.assessSvc.currentTab = 'results';
    this.navSvc.itemSelected.asObservable().subscribe((value: string) => {
      this.router.navigate([value], { relativeTo: this.route });
    });
  }

  populateTree() {
    const magic = this.navSvc.getMagic();
    this.navSvc.setTree([
      { label: 'Analysis Dashboard', value: 'dashboard', children: [
        { label: 'Ranked Questions', value: 'ranked-questions', children: [] },
        // { label: 'Overall Ranked Categories', value: 'overall-ranked-categories', children: [] },
        { label: 'Standards Summary', value: 'standards-summary', children: [
          { label: 'Ranked Categories', value: 'standards-ranked', children: [] },
          { label: 'Results by Category', value: 'standards-results', children: [] }
        ] },
        // { label: 'Components Summary', value: 'components-summary', children: [
        //   { label: 'Ranked Categories', value: 'components-ranked', children: [] },
        //   { label: 'Results by Category', value: 'components-results', children: [] },
        //   { label: 'Component Types', value: 'components-types', children: [] },
        //   { label: 'Network Warnings', value: 'components-warnings', children: [] }
        // ] },
      ] },
      { label: 'Executive Summary, Overview, & Comments', value: 'overview', children: [] },
      { label: 'Reports', value: 'reports', children: [] }
    ], magic);
    this.navSvc.treeControl.expandDescendants(this.navSvc.dataSource.data[0]);
  }
}