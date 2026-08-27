import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';
import { countryCodes } from '../data/defaults';

export default function PersonalInfoForm({ t, data, updateField }) {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const targetRatio = 4 / 5;
          let srcWidth = img.width;
          let srcHeight = img.height;
          const srcRatio = srcWidth / srcHeight;
          let cropWidth = srcWidth;
          let cropHeight = srcHeight;
          let cropX = 0;
          let cropY = 0;
          if (srcRatio > targetRatio) {
            cropWidth = srcHeight * targetRatio;
            cropX = (srcWidth - cropWidth) / 2;
          } else {
            cropHeight = srcWidth / targetRatio;
            cropY = (srcHeight - cropHeight) / 2;
          }
          const outputWidth = 400;
          const outputHeight = 500;
          canvas.width = outputWidth;
          canvas.height = outputHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          updateField('personalInfo', null, 'photo', dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const removePhoto = () => updateField('personalInfo', null, 'photo', null);

  const handlePhoneChange = (value) => {
    // نضمن أن الرقم يبدأ بصفر وهمي
    updateField('personalInfo', null, 'phone', value);
  };

  const fields = [
    { key: 'fullName', label: 'fullName', type: 'text', required: true },
    { key: 'email', label: 'email', type: 'email', required: true },
    { key: 'address', label: 'address', type: 'text', required: false },
    { key: 'dateOfBirth', label: 'dateOfBirth', type: 'text', required: false },
    { key: 'placeOfBirth', label: 'placeOfBirth', type: 'text', required: false },
    { key: 'linkedin', label: 'linkedin', type: 'text', required: false },
    { key: 'github', label: 'github', type: 'text', required: false },
    { key: 'website', label: 'website', type: 'text', required: false },
  ];

  return (
    <div className="space-y-4">
      {/* رفع الصورة */}
      <div className="flex items-center gap-4">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        <div onClick={triggerFileInput} className="relative w-24 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-royal-gold hover:bg-royal-navy/5 transition-all overflow-hidden">
          {data.photo ? (
            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <Camera className="h-6 w-6 text-gray-400 mx-auto mb-1" />
              <span className="text-xs text-gray-500">Foto</span>
            </div>
          )}
          {data.photo && (
            <button onClick={(e) => { e.stopPropagation(); removePhoto(); }} className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-md text-gray-500 hover:text-red-500">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500">
          <p>JPEG oder PNG</p>
          <p>Format: 4:5 (Hochformat)</p>
          <p>Mindestens 400×500 px</p>
        </div>
      </div>

      {/* الهاتف مع رمز الدولة */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.phone}</label>
        <div className="flex gap-2">
          <select
            value={data.phone?.split(' ')[0] || '+49'}
            onChange={(e) => {
              const newCode = e.target.value;
              const currentNumber = data.phone?.split(' ').slice(1).join(' ') || '000 0000000';
              updateField('personalInfo', null, 'phone', `${newCode} ${currentNumber}`);
            }}
            className="w-28 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold"
          >
            {countryCodes.map(cc => (
              <option key={cc.code} value={cc.code}>{cc.code}</option>
            ))}
          </select>
          <input
            type="text"
            value={data.phone?.split(' ').slice(1).join(' ') || '000 0000000'}
            onChange={(e) => {
              const code = data.phone?.split(' ')[0] || '+49';
              updateField('personalInfo', null, 'phone', `${code} ${e.target.value}`);
            }}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold"
            placeholder="000 0000000"
          />
        </div>
      </div>

      {fields.map(field => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.form[field.label]}</label>
          <input
            type={field.type}
            value={data[field.key] || ''}
            onChange={(e) => updateField('personalInfo', null, field.key, e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal-gold"
            required={field.required}
          />
        </div>
      ))}
    </div>
  );
}
