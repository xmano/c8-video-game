module.exports = {
  name: 'vgames',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/vgames',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
