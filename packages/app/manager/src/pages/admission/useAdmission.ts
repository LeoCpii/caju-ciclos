import { useContext } from 'react';

import { AdmissionContext } from './AdmissionProvider';

export default function useAdmission() {
    return useContext(AdmissionContext);
}