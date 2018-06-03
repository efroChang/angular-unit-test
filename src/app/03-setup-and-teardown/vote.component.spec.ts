import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {

  let component: VoteComponent;

  beforeAll( () => {} );                // Setup

  beforeEach( () => {
    
    component = new VoteComponent();    // Setup
  });

  afterEach( () => {} );                // Tear Down

  afterAll( () => {} );                 // Tear Down

  it('should increment total vote when upvotes', () => {

    component.upVote();

    expect( component.totalVotes ).toBe( 1 );
  });

  it('should decrement total vote when downvotes', () => {

    component.downVote();

    expect( component.totalVotes ).toBe( -1 );
  });
});