import { Divider, Row, Col, Spin, Tooltip, Tag } from 'antd';

export default function SummaryCard({
  title,
  tagContent,
  tagColor,
  prefix,
  isLoading = false,
  onClick,
  showPointer = true,
}) {
  const interactive = typeof onClick === 'function';
  const hoverable = interactive && showPointer;

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 6 }}
      lg={{ span: 6 }}
    >
      <div
        className="whiteBox shadow"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={(event) => {
          if (!interactive) {
            return;
          }

          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        }}
        style={{
          color: '#595959',
          fontSize: 13,
          minHeight: '106px',
          height: '100%',
          cursor: hoverable ? 'pointer' : 'default',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          outline: 'none',
        }}
        onMouseEnter={(event) => {
          if (!hoverable) {
            return;
          }

          event.currentTarget.style.transform = 'translateY(-2px)';
          event.currentTarget.style.boxShadow = '0 12px 28px rgba(34, 7, 94, 0.12)';
          event.currentTarget.style.borderColor = '#c9d6ff';
        }}
        onMouseLeave={(event) => {
          if (!hoverable) {
            return;
          }

          event.currentTarget.style.transform = 'translateY(0)';
          event.currentTarget.style.boxShadow = '';
          event.currentTarget.style.borderColor = '';
        }}
      >
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3
            style={{
              color: '#22075e',
              fontSize: 'large',
              margin: '5px 0',
              textTransform: 'capitalize',
            }}
          >
            {title}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ textAlign: 'left', minWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {prefix}
            </div>

            <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
              {isLoading ? (
                <Spin />
              ) : (
                <Tooltip title={tagContent}>
                  <Tag
                    color={tagColor}
                    style={{
                      margin: 0,
                      justifyContent: 'center',
                      maxWidth: '56px',
                      display: 'inline-block',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      fontSize: 14,
                      padding: '0 6px',
                    }}
                  >
                    {tagContent}
                  </Tag>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
