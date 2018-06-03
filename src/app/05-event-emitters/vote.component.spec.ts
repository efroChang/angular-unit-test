import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise voteChanged when upvotes', () => {

    let totalVoutes = null;
    component.voteChanged.subscribe( value => totalVoutes = value );

    component.upVote();

    expect( totalVoutes ).toBe( 1 );
  });
});