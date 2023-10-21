import FormContainer from '../../components/common/FormContainer.tsx';
import {useCreateHoliday} from '../../api/Queries/HolidayQueries.ts';
import * as dayjs from 'dayjs';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import {useNavigate} from 'react-router-dom';
import GenericForm from '../../components/common/GenericForm.tsx';
import {InitialValues} from '../../../typing/inputType.ts';
import {useAuth} from "../../provider/AuthProvider.tsx";
import { useMessages } from '../../provider/MessagesProvider.tsx';


const inputsHoliday = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Vacances 2023-2024',
    errorMessage: 'Ça doit être un nom valide !',
    label: 'Nom :',
    required: true,
  },
  {
    id: 'country',
    name: 'country',
    type: 'text',
    placeholder: 'Pays',
    errorMessage: 'Belgique',
    label: 'Pays :',
    required: true,
  },
  {
    id: 'number',
    name: 'number',
    type: 'number',
    placeholder: '77',
    errorMessage: 'Le numéro de la boite doit être nombre compris entre 0 et 25000 !',
    label: 'Numéro de boite :',
    required: true,
  },
  {
    id: 'street',
    name: 'street',
    type: 'text',
    placeholder: 'Rue du port',
    errorMessage: 'Merci de saisir entre 0 à 100 caractères !',
    label: 'Rue :',
    required: true,
  },
  {
    id: 'postalCode',
    name: 'postalCode',
    type: 'number',
    placeholder: '4000',
    errorMessage: 'Merci d\'indiquer un code postal entre 1 à 6 chiffres',
    label: 'Code postal :',
    required: true,
  },
  {
    id: 'locality',
    name: 'locality',
    type: 'text',
    placeholder: 'Liège',
    errorMessage: 'Le numéro de la boite doit être nombre compris entre 0 et 25000 !',
    label: 'Lieu :',
    required: true,
  },
  {
    id: 'startDate',
    name: 'startDate',
    type: 'date',
    placeholder: 'Date de début',
    errorMessage: '04/10/2023',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'date',
    placeholder: 'Date de fin',
    errorMessage: '6/10/2023',
    label: 'Date de fin :',
    required: true,
  },
];

const descriptionTextArea = {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'On va faire de l\'aqua poney, trop bien !',
  errorMessage: '',
  label: 'Description',
  required: false,
};

const EncodeHoliday = () => {
  const { mutate: mutateHoliday } = useCreateHoliday();
  const navigate = useNavigate();
  const { user } = useAuth();
  const initialValues = {
    name: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    startDate: '',
    endDate: '',
  };

  const handleSubmit = (values: InitialValues) => {
    const { name, country, number, street, postalCode, locality, startDate, endDate, description } = values;

    // TODO VERIFIER SI ACTIVITIES EST NECESSAIRE
    mutateHoliday(
      {
        name,
        description,
        startDate: dayjs(startDate).format(),
        endDate: dayjs(endDate).format(),
        location: {
          street,
          number,
          locality,
          postalCode,
          country,
        },
        creatorId: user.id,
        isPublish: false,
        activities: [],
      },
      {
        onError: () => alert('An error occurred'),
        onSuccess: () => {navigate('/holidays');
        },
      }
    );


  };

  return (
    <PageWrapper>
      <FormContainer title="Encoder vacances">
        <GenericForm
          fields={inputsHoliday}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          textAreaProps={descriptionTextArea}
          buttonText="Encoder"
        />
      </FormContainer>
    </PageWrapper>
  );
};
export default EncodeHoliday;
