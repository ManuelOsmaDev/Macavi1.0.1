import { Component, Input } from '@angular/core';

import { Services } from 'app/admin/metrics/metrics.model';

@Component({
  selector: 'macavi-metrics-endpoints-requests',
  templateUrl: './metrics-endpoints-requests.component.html',
})
export class MetricsEndpointsRequestsComponent {
  /**
   * object containing service related metrics
   */
  @Input() endpointsRequestsMetrics?: Services;

  /**
   * boolean field saying if the metrics are in the process of being updated
   */
  @Input() updating?: boolean;
}
