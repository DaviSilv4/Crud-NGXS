/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { NotificationMessageNewFormComponent } from './notification-message-new-form.component';
import { NgxsModule, Store } from '@ngxs/store';
import { MessaegeState } from 'src/app/store/state/message.state';
import { GetMessage } from 'src/app/store/actions/message.actions';
import { ApiService } from 'src/app/service/api-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationMessageNewFormComponent', () => {
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NotificationMessageNewFormComponent],
      imports: [
      NgxsModule.forRoot([MessaegeState]),
      HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
    store = TestBed.get(Store);
  });

  it('chamando GetMessage', () => {
    const apiService = TestBed.get(ApiService);
    store.dispatch(new GetMessage());
    // store.selectOnce(state => state.getMessage).subscribe(feed => {
    //   expect(feed).toBe(true);
    // });
    expect(apiService).toBeTruthy();

  });
});
