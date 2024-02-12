import { SegmentedControl } from '@mantine/core';
import React, { FC, useState } from 'react';

interface ManageMemberProps {

}

const ManageMember: FC<ManageMemberProps> = ({ }) => {
    const [value, setValue] = useState('view-all')
    return (
        <>
            <div className='p-2'>
                <div className='d-flex align-items-center justify-content-center mb-3'>
                    <SegmentedControl
                        value={value}
                        onChange={setValue}
                        data={[
                            { label: 'View All', value: 'view-all' },
                            { label: 'Add New Member', value: 'add-new-member' },
                            { label: 'Update Member Details', value: 'update-member-details' },
                            { label: 'Assign Fee', value: 'assign-fee' },
                            { label: 'Assign Monthly Notification', value: 'assign-notification' },
                        ]}
                    />
                </div>
                <div>
                    {
                        value === 'view-all' ?
                        "VIEW ALL" :
                        value === 'add-new-member' ?
                        "ADD NEW MEMBER" :
                        value === 'update-member-details' ?
                        "MEMBER DETAILS" :
                        value === 'assign-fee' ?
                        "ASSIGN FEE" : 
                        value === 'assign-notification' ?
                        "ASSIGN NOTIFICATION" :
                        null
                    }
                </div>
            </div>
        </>
    );
};

export default ManageMember;