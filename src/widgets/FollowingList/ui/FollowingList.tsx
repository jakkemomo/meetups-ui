import { ReactElement } from 'react';
import { followings } from '../../../features/subscription/model/constants'; 
import FollowingSection from './FollowingSection';
import SummaryLabel from '@/widgets/SummaryLabel/SummaryLabel';


function FollowingList(): ReactElement {
    const people = followings.filter(item => item.type === 'people');
    const organizations = followings.filter(item => item.type === 'organization');
  
    return (
        <section className="flex flex-col mt-5 mb-10">
            <SummaryLabel title='Всего' count={followings.length} />
            <div className="flex gap-40">
                <FollowingSection title="Люди" items={people} />
                <FollowingSection title="Организации" items={organizations} />
            </div>
        </section>
    );
}

export default FollowingList;
  
