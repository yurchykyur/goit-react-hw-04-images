import {  useState } from 'react';
import PropTypes from 'prop-types';


import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

export default function ImageGalleryItem(props){
const [isModalOpen, setIsModalOpen] = useState(false)

 const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const {
      galleryItem: { webformatURL, largeImageURL, tags },
    } = props;
  return (
      <>
        <GalleryItem className="gallery-item" onClick={toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            alt={tags}
            onCloseModal={() => toggleModal()}
          />
        )}
      </>
    );
}

//  class OldImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

//   toggleModal = () => {
//     this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
//   };

//   render() {
//     const {
//       galleryItem: { webformatURL, largeImageURL, tags },
//     } = this.props;

//     return (
//       <>
//         <GalleryItem className="gallery-item" onClick={this.toggleModal}>
//           <GalleryImg src={webformatURL} alt={tags} />
//         </GalleryItem>
//         {this.state.isModalOpen && (
//           <Modal
//             largeImageURL={largeImageURL}
//             alt={tags}
//             onCloseModal={this.toggleModal}
//           />
//         )}
//       </>
//     );
//   }
// }

ImageGalleryItem.propTypes = {
  galleryItem: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};