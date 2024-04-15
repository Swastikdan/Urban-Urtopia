const isValidPlace = () => {
  const fields = [
    { value: formdata.title, name: 'Title', min: 10, max: 100 },
    {
      value: formdata.description,
      name: 'Description',
      min: 100,
      max: 2500,
      isWordCount: true,
    },
    { value: formdata.address, name: 'Address' },
    { value: formdata.state, name: 'State' },
    { value: formdata.city, name: 'City' },
    { value: formdata.street, name: 'Street' },
    { value: formdata.category, name: 'Category' },
    { value: formdata.amenities.necessary, name: 'Necessary amenities' },
    { value: formdata.amenities.standout, name: 'Standout amenities' },
    { value: formdata.amenities.safety, name: 'Safety amenities' },
    { value: formdata.photos, name: 'Photos', min: 5 },
    { value: formdata.houseRules.maxGuests, name: 'Max guests' },
    { value: formdata.price, name: 'Price' },
    { value: formdata.listTillDate, name: 'List Till Date' },
    { value: formdata.houseRules.petsAllowed, name: 'Pets Allowed' },
    { value: formdata.houseRules.checkInTime, name: 'Check In Time' },
    { value: formdata.houseRules.checkOutTime, name: 'Check Out Time' },
    {
      value: formdata.houseRules.smokingNotAllowed,
      name: 'Smoking Not Allowed',
    },
    {
      value: formdata.houseRules.partiesNotAllowed,
      name: 'Parties Not Allowed',
    },
    {
      value: formdata.houseRules.photographyNotAllowed,
      name: 'Photography Not Allowed',
    },
    { value: formdata.houseRules.SelfcheckIn, name: 'Self Check In' },
    { value: formdata.additionalRules, name: 'Additional Rules' },
    { value: formdata.numberOfRooms, name: 'Number Of Rooms' },
  ];

  for (let field of fields) {
    if (
      field.value === undefined ||
      field.value === null ||
      (typeof field.value === 'string' && !field.value.trim())
    ) {
      toast.error(`${field.name} can't be empty!`);
      return false;
    }

    const length = field.isWordCount
      ? field.value.split(/\s+/).length
      : typeof field.value === 'string'
        ? field.value.length
        : undefined;

    if (field.min && length < field.min) {
      toast.error(
        `${field.name} can't be less than ${field.min} ${field.isWordCount ? 'words' : 'characters'}`,
      );
      return false;
    }

    if (field.max && length > field.max) {
      toast.error(
        `${field.name} can't be more than ${field.max} ${field.isWordCount ? 'words' : 'characters'}`,
      );
      return false;
    }
  }

  return true;
};

export default isValidPlace;