import { ReactElement } from 'react';
import { followings } from '../../../features/subscription/model/constants'; 
import FollowingSection from './FollowingSection';


function FollowingList(): ReactElement {
    const people = followings.filter(item => item.type === 'people');
    const organizations = followings.filter(item => item.type === 'organization');
  
    return (
      <div className="flex gap-40">
        <FollowingSection title="Люди" items={people} />
        <FollowingSection title="Организации" items={organizations} />
      </div>
    );
}

export default FollowingList;
  
