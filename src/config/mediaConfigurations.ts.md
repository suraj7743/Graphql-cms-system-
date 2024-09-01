## Media Configuration

**Table of Contents**

- [Introduction](#introduction)
- [Constants](#constants)
- [Data Structures](#data-structures)
- [Media Configurations](#media-configurations)

### Introduction

This module defines and manages media configurations for different media types. 

### Constants

The following constants are used in this module:

| Constant        | Description                                                                                                                    |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------|
| `MediaType`     | An enum defining different media types supported by the system.                                                               |
| `maxFileSize`   | The maximum allowed file size for a given media type.                                                                           |
| `supportedExtensions` | An array of supported file extensions for a given media type.                                                               |

### Data Structures

The following data structures are used in this module:

| Data Structure   | Description                                                                                                                                                                                                                                                          |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MediaConfig`     | Defines a configuration for a specific media type. It includes two properties: `maxFileSize` and `supportedExtensions`.                                                                                                                                                                      |
| `MediaConfigurations` | An object containing `MediaConfig` objects for each defined `MediaType`. It allows accessing specific media configurations based on their type.                                                                                                                              |

### Media Configurations

The `MediaConfigurations` object maps each `MediaType` to a corresponding `MediaConfig`.  Currently, the following media configurations are defined:

| Media Type | Maximum File Size (MB) | Supported Extensions |
|------------|--------------------------|-----------------------|
| Proposal  | 3                         | jpg, jpeg, png       |
| User Avatar| 3                         | jpg, jpeg, png       |
| User Document | 3                         | jpg, jpeg, png       |
| Logo       | 3                         | jpg, jpeg, png       |

**Example Usage:**

```javascript
import MediaConfigurations from './media.config';

const proposalConfig = MediaConfigurations[MediaType.PROPOSAL]; // Get configuration for proposals

// Check if a file extension is supported
const isExtensionSupported = proposalConfig.supportedExtensions.includes('png'); 

// Check if a file is within the allowed size
const fileIsWithinSizeLimit = fileSizeInBytes <= proposalConfig.maxFileSize; 
``` 
