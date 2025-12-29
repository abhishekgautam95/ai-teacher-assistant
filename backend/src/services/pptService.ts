import pptxgen from 'pptxgenjs';

/**
 * Generate PowerPoint presentation from notes
 */
export const generatePPTFromNotes = async (
  notes: {
    title: string;
    board: string;
    class: number;
    subject: string;
    chapter: string;
    content: string;
  },
  outputPath: string
): Promise<string> => {
  try {
    const pptx = new pptxgen();

    // Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: '2563eb' };
    titleSlide.addText(notes.chapter, {
      x: 1,
      y: 1.5,
      w: 8,
      h: 1,
      fontSize: 44,
      bold: true,
      color: 'FFFFFF',
      align: 'center'
    });
    titleSlide.addText(`${notes.board} - Class ${notes.class} - ${notes.subject}`, {
      x: 1,
      y: 3,
      w: 8,
      h: 0.5,
      fontSize: 20,
      color: 'FFFFFF',
      align: 'center'
    });

    // Split content into sections (paragraphs)
    const sections = notes.content.split('\n\n').filter(section => section.trim());

    sections.forEach((section, index) => {
      const slide = pptx.addSlide();
      
      // Add section heading if it starts with # or ##
      if (section.startsWith('#')) {
        const lines = section.split('\n');
        const heading = lines[0].replace(/^#+\s*/, '');
        const content = lines.slice(1).join('\n');
        
        slide.addText(heading, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 28,
          bold: true,
          color: '1e40af'
        });
        
        slide.addText(content, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 4,
          fontSize: 16,
          color: '1f2937',
          valign: 'top'
        });
      } else {
        // Regular content slide
        slide.addText(`Key Points - ${index + 1}`, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 28,
          bold: true,
          color: '1e40af'
        });
        
        slide.addText(section, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 4,
          fontSize: 16,
          color: '1f2937',
          bullet: true,
          valign: 'top'
        });
      }
    });

    await pptx.writeFile({ fileName: outputPath });
    return outputPath;
  } catch (error) {
    console.error('Error generating PPT:', error);
    throw new Error('Failed to generate PowerPoint presentation');
  }
};
